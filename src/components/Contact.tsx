import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Linkedin, Github, Send } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const Contact = () => {
  const phoneNumber = "917984527433";
  const whatsappUrl = `https://wa.me/${phoneNumber}`;
  const emailAddress = "vishwastiwari1901@gmail.com";
  const mailtoUrl = `mailto:${emailAddress}`;
  const linkedinUrl =
    "https://www.linkedin.com/in/vishwas-tiwari-74893a300?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app";
  const githubUrl = "https://github.com/Vishhhfr";

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message || "(No message)"}`
    );
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent("Portfolio contact")}&body=${body}`;
  };

  return (
    <section id="contact" className="relative section-band-alt overflow-hidden">
      <div className="section-container">
        <Reveal>
          <p className="section-eyebrow text-center">Collaborate</p>
          <h2 className="section-title text-center mx-auto block">Get in touch</h2>
          <p className="section-desc text-center mx-auto mb-14">
            Open to internships, projects, and interesting data/ML problems.
          </p>
        </Reveal>

        <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-8">
          <Reveal className="lg:col-span-2" delay={0.06}>
            <Card className="card-hover border-0 h-full">
              <CardContent className="p-6 md:p-8 flex flex-col gap-8">
                <div>
                  <h3 className="text-lg font-display font-semibold mb-6">Direct channels</h3>
                  <div className="space-y-6">
                    <a
                      href={mailtoUrl}
                      className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-primary/25 hover:bg-primary/5 group"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-label text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Email</p>
                        <p className="font-medium text-sm break-all group-hover:text-primary transition-colors">{emailAddress}</p>
                      </div>
                    </a>
                    <div className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(207,100%,50%)]/15 text-[hsl(207,100%,70%)]">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-label text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Location</p>
                        <p className="font-medium text-sm">Surat, Gujarat</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-label text-[10px] uppercase tracking-wider text-muted-foreground mb-4">Social</h4>
                  <div className="flex gap-3">
                    <a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary hover:border-primary/30 hover:bg-primary/10 transition"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-primary hover:border-primary/30 hover:bg-primary/10 transition"
                      aria-label="GitHub"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal className="lg:col-span-3" delay={0.1}>
            <Card className="card-hover border-0 h-full">
              <CardContent className="p-6 md:p-8">
                <h3 className="text-lg font-display font-semibold mb-2">Send a message</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Fills your mail client — no backend required.
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="font-label text-[10px] uppercase tracking-wider text-muted-foreground">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      className="input-underline mt-1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="font-label text-[10px] uppercase tracking-wider text-muted-foreground">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className="input-underline mt-1"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="font-label text-[10px] uppercase tracking-wider text-muted-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      className="input-underline mt-1 resize-none min-h-[120px]"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <Button type="submit" className="font-label gap-2">
                      <Send className="w-4 h-4" />
                      Open in email
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="font-label"
                      onClick={() => window.open(whatsappUrl, "_blank")}
                    >
                      WhatsApp
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
