import { cloneElement, useEffect, useState, type FormEvent, type ReactElement } from "react";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { contacts, events } from "@/integrations/core";

export type InquiryService = "" | "blueprint" | "process-fix" | "general";

type InquiryDialogProps = { open: boolean; onOpenChange: (open: boolean) => void; defaultService?: InquiryService };
type FormState = { name: string; email: string; company: string; service: InquiryService; bottleneck: string };
type FormErrors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = { name: "", email: "", company: "", service: "", bottleneck: "" };
const SERVICE_OPTIONS: { value: InquiryService; label: string }[] = [
  { value: "blueprint", label: "The Blueprint & Operating Map" },
  { value: "process-fix", label: "The Single Process Fix" },
  { value: "general", label: "Not sure yet / general walkthrough" },
];

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  return { first_name: parts[0] || fullName.trim(), last_name: parts.length > 1 ? parts.slice(1).join(" ") : undefined };
}

function validate(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim()) errors.name = "Name is required.";
  if (!form.email.trim()) errors.email = "Work email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = "Enter a valid email address.";
  if (!form.bottleneck.trim()) errors.bottleneck = "Tell us about the bottleneck you are seeing.";
  else if (form.bottleneck.trim().length < 12) errors.bottleneck = "Add a bit more detail so we can prepare.";
  return errors;
}

export function InquiryDialog({ open, onOpenChange, defaultService = "" }: InquiryDialogProps) {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (open) {
      setForm((prev) => ({ ...prev, service: defaultService || prev.service || "" }));
      setSubmitError(null);
    } else {
      setSuccess(false);
      setErrors({});
      setSubmitError(null);
      setForm(INITIAL);
    }
  }, [open, defaultService]);

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);
    setSubmitError(null);
    const { first_name, last_name } = splitName(form.name);
    const email = form.email.trim().toLowerCase();
    const serviceLabel = SERVICE_OPTIONS.find((service) => service.value === form.service)?.label || "General inquiry";
    const tags = ["inquiry"];
    if (form.service === "blueprint" || form.service === "process-fix") tags.push(form.service);
    const notes = [`Service interest: ${serviceLabel}`, form.company.trim() ? `Company: ${form.company.trim()}` : null, `Bottleneck: ${form.bottleneck.trim()}`, "Source: IncludeBrake homepage inquiry"].filter(Boolean).join("\n");

    try {
      await contacts({ email, first_name, ...(last_name ? { last_name } : {}), tags, contact_stage: "lead", source: "website-inquiry", append_notes: notes });
      try {
        await events({ event_name: "service_inquiry", contact_email: email, properties: { service: form.service || "general", company: form.company.trim() || null }, source: "website" });
      } catch (eventError) {
        console.error("Inquiry event logging failed:", eventError);
      }
      setSuccess(true);
    } catch (error) {
      console.error("Failed to save inquiry:", error);
      setSubmitError("We could not save your inquiry just now. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return <Dialog open={open} onOpenChange={onOpenChange}><DialogContent className="max-h-[90vh] overflow-y-auto rounded-[1.6rem] border-white/[0.15] bg-black p-0 text-white shadow-2xl sm:max-w-lg"><div className="border-b border-white/10 px-6 py-7 pr-14 sm:px-8"><DialogHeader className="space-y-3 text-left"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/[0.45]">Service inquiry</p><DialogTitle className="font-sans text-3xl font-extrabold leading-[0.95] tracking-[-0.06em] text-white">{success ? "Your inquiry is saved." : "Talk through the bottleneck."}</DialogTitle><DialogDescription className="text-sm leading-relaxed text-white/[0.55]">{success ? "We have your details. Expect a reply to the email you provided when we review this inquiry." : "Share the bottleneck you are seeing. No software swap required. We review each inquiry before we reply."}</DialogDescription></DialogHeader></div>{success ? <div className="space-y-5 px-6 py-7 sm:px-8"><p className="text-sm leading-relaxed text-white/60">Thanks for reaching out. Your inquiry is saved with IncludeBrake. Keep an eye on your inbox for next steps.</p><button type="button" onClick={() => onOpenChange(false)} className="pill-button inline-flex h-11 w-full items-center justify-center bg-white px-5 text-sm font-bold text-black transition hover:bg-white/[0.85]">Close</button></div> : <form onSubmit={handleSubmit} className="space-y-4 px-6 py-7 sm:px-8" noValidate><Field id="inquiry-name" label="Name" error={errors.name} required><input id="inquiry-name" name="name" autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} className={fieldClass(errors.name)} placeholder="Your name" disabled={submitting} /></Field><Field id="inquiry-email" label="Work email" error={errors.email} required><input id="inquiry-email" name="email" type="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} className={fieldClass(errors.email)} placeholder="you@company.com" disabled={submitting} /></Field><Field id="inquiry-company" label="Company" error={errors.company}><input id="inquiry-company" name="company" autoComplete="organization" value={form.company} onChange={(event) => update("company", event.target.value)} className={fieldClass(errors.company)} placeholder="Shop or fleet name" disabled={submitting} /></Field><Field id="inquiry-service" label="Service interest" error={errors.service}><select id="inquiry-service" name="service" value={form.service} onChange={(event) => update("service", event.target.value as InquiryService)} className={`${fieldClass(errors.service)} inquiry-service-select`} style={{ colorScheme: "dark" }} disabled={submitting}><option value="" disabled>Select one (optional)</option>{SERVICE_OPTIONS.map((option) => <option key={option.value} value={option.value} className="bg-black text-white" style={{ backgroundColor: "#050505", color: "#ffffff" }}>{option.label}</option>)}</select></Field><Field id="inquiry-bottleneck" label="What bottleneck are you seeing?" error={errors.bottleneck} required><textarea id="inquiry-bottleneck" name="bottleneck" rows={4} value={form.bottleneck} onChange={(event) => update("bottleneck", event.target.value)} className={`${fieldClass(errors.bottleneck)} min-h-[112px] resize-y`} placeholder="Example: Estimates sit for two days because only one person can price specialty jobs." disabled={submitting} /></Field>{submitError ? <p className="text-sm font-medium text-white/75" role="alert">{submitError}</p> : null}<button type="submit" disabled={submitting} className="pill-button inline-flex h-12 w-full items-center justify-center gap-2 bg-white px-5 text-sm font-bold text-black transition hover:bg-white/[0.85] disabled:cursor-not-allowed disabled:opacity-60">{submitting ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Saving inquiry...</> : "Send inquiry"}</button><p className="text-xs leading-relaxed text-white/[0.35]">Submitting saves your inquiry to our contact list. This is not an instant booking confirmation.</p></form>}</DialogContent></Dialog>;
}

function Field({ id, label, error, required, children }: { id: string; label: string; error?: string; required?: boolean; children: ReactElement<any> }) {
  const describedBy = error ? `${id}-error` : undefined;
  const control = cloneElement(children, { "aria-invalid": error ? true : undefined, "aria-describedby": describedBy, "aria-required": required || undefined });
  return <div className="space-y-1.5"><label htmlFor={id} className="block text-sm font-semibold text-white">{label}{required ? <span className="text-white/[0.45]"> *</span> : null}</label>{control}{error ? <p id={`${id}-error`} className="text-xs font-medium text-white/70" role="alert">{error}</p> : null}</div>;
}

function fieldClass(error?: string) {
  return ["flex w-full rounded-xl border bg-white/[0.06] px-3.5 py-3 text-sm text-white placeholder:text-white/30", "transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black", "disabled:cursor-not-allowed disabled:opacity-60", error ? "border-white/80" : "border-white/[0.15]"].join(" ");
}
