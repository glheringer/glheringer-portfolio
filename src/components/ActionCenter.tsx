import { useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Keyboard,
  Moon,
  Sun,
  Download,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Copy,
  Eye,
  EyeOff,
  Info,
} from "lucide-react";
import { useThemeStore } from "@/features/theme/store/themeStore";
import { useReducedMotionStore } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Button } from "./ui/button";

interface ActionCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ActionCenter = ({ isOpen, onClose }: ActionCenterProps) => {
  const { theme } = useThemeStore();
  const { reducedMotion, toggleReducedMotion } = useReducedMotionStore();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      if (event.key === "Escape" && isOpen) {
        event.preventDefault();
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, onClose]);

  const handleDownloadCV = () => {
    window.open(
      "/documents/Curriculo_Guilherme_Heringer_Linkedin.pdf",
      "_blank"
    );
    toast.success("Abrindo currículo...", { duration: 2000 });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("guilhermeheringer1999@gmail.com");
    toast.success("Email copiado para área de transferência!", {
      duration: 2000,
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* TIP: Shortcuts - Left Side */}
      <div className="fixed bottom-8 left-8 z-[101] w-full max-w-sm animate-in slide-in-from-left duration-300">
        <div className="bg-background/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-6">
          <div className="flex items-center gap-2 text-foreground mb-4">
            <Keyboard className="h-5 w-5" />
            <h3 className="text-base font-semibold">DICA: Atalhos</h3>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Navegue pelo site com facilidade usando atalhos de teclado.
          </p>

          <div className="space-y-4">
            <ShortcutItem label="Abrir Acesso Rápido" keys={["Q"]} />
            <ShortcutItem label="Fechar Acesso Rápido" keys={["Q", "Esc"]} />
            <ShortcutItem label="Alternar Modo Escuro" keys={["D"]} />
            <ShortcutItem label="Reduzir Movimento" keys={["R"]} />
          </div>
        </div>
      </div>

      {/* Action Center - Right Side */}
      <div className="fixed top-0 right-0 bottom-0 z-[101] w-full max-w-md animate-in slide-in-from-right duration-300">
        <div className="h-full bg-background/95 backdrop-blur-xl border-l border-border shadow-2xl flex flex-col">
          <div className="p-6 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Central de Ações
              </h2>
              <button
                onClick={onClose}
                className="rounded-full p-2 hover:bg-accent/10 transition-colors"
                aria-label="Fechar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Actions Cards */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="flex flex-col items-center justify-center p-6 rounded-xl bg-muted/50 border border-border">
                {theme === "dark" ? (
                  <Moon className="h-6 w-6 mb-3 text-accent" />
                ) : (
                  <Sun className="h-6 w-6 mb-3 text-accent" />
                )}
                <span className="text-sm font-medium text-center">
                  Tema Escuro: {theme === "dark" ? "Ligado" : "Desligado"}
                </span>
              </div>
            </div>

            {/* Download CV */}
            <div className="mb-6">
              <Button
                onClick={handleDownloadCV}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-semibold h-12 text-base rounded-xl"
              >
                <Download className="h-5 w-5 mr-2" />
                Baixar Currículo (CV)
              </Button>
            </div>

            {/* Accessibility */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Acessibilidade
              </h3>
              <button
                onClick={toggleReducedMotion}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors border border-transparent hover:border-accent"
              >
                <div className="flex items-center gap-2">
                  {reducedMotion ? (
                    <EyeOff className="h-4 w-4 text-accent" />
                  ) : (
                    <Eye className="h-4 w-4 text-accent" />
                  )}
                  <span className="text-sm font-medium">Reduzir Movimento</span>
                  <div className="group relative">
                    <Info className="h-4 w-4 text-muted-foreground hover:text-foreground transition-colors cursor-help" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-64 p-3 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50">
                      <p className="text-xs text-popover-foreground leading-relaxed">
                        Remove ou reduz significativamente as animações do site,
                        tornando-o mais confortável para pessoas sensíveis a movimento
                        ou que preferem uma experiência mais estática.
                      </p>
                    </div>
                  </div>
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    reducedMotion ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  {reducedMotion ? "Ativo" : "Desativado"}
                </span>
              </button>
            </div>

            {/* Social Links */}
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Redes Sociais
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <SocialButton
                  icon={<Github className="h-5 w-5" />}
                  label="GitHub"
                  href="https://github.com/glheringer"
                />
                <SocialButton
                  icon={<Linkedin className="h-5 w-5" />}
                  label="LinkedIn"
                  href="https://linkedin.com/in/glheringer"
                />
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/10 hover:border-accent transition-all"
                >
                  <Mail className="h-5 w-5 text-accent" />
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">Email</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      Copiar <Copy className="h-3 w-3" />
                    </span>
                  </div>
                </button>
                <SocialButton
                  icon={<MessageCircle className="h-5 w-5" />}
                  label="WhatsApp"
                  href="https://wa.me/5531997577741"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SocialButton = ({ icon, label, href }: SocialButtonProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/10 hover:border-accent transition-all"
    >
      <div className="text-accent">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </a>
  );
};

interface ShortcutItemProps {
  label: string;
  keys: string[];
}

const ShortcutItem = ({ label, keys }: ShortcutItemProps) => {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        {keys.map((key, index) => (
          <div key={key} className="flex items-center gap-2">
            {index > 0 && (
              <span className="text-muted-foreground text-xs">or</span>
            )}
            <kbd className="px-3 py-1.5 rounded-md bg-muted/80 border border-border font-mono text-xs font-semibold">
              {key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
};
