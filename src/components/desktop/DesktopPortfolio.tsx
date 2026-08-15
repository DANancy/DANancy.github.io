"use client";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  Archive,
  BookOpen,
  BriefcaseBusiness,
  Bug,
  CalendarDays,
  Camera,
  Clapperboard,
  Clock3,
  Compass,
  ExternalLink,
  Flower2,
  Gamepad2,
  Globe2,
  GraduationCap,
  Heart,
  House,
  Lightbulb,
  Presentation,
  Store,
  Link as LinkIcon,
  Mail,
  MapPin,
  Network,
  PartyPopper,
  Send,
  Sparkles,
  Star,
  Terminal,
  Tv,
  Wrench,
  X,
  Zap,
} from "lucide-react";
import { navigation, projects, type DesktopSection } from "@/data/desktop";
import characterImage from "@/assets/web/yangyang-character.webp";
import aboutCharacter from "@/assets/web/character-about.png";
import workCharacter from "@/assets/web/character-work.png";
import communityCharacter from "@/assets/web/character-community.png";
import funCharacter from "@/assets/web/character-fun.png";
import linksCharacter from "@/assets/web/character-links.png";
import contactCharacter from "@/assets/web/character-contact.png";
import backyardOrchard from "@/assets/web/yangyang-backyard-orchard.webp";
import bootcampLifecycleImage from "@/assets/web/data-engineering-bootcamp.png";
import homeEssentialsImage from "@/assets/web/home-essentials.jpg";
import mercyBookImage from "@/assets/仁慈的关系.jpg";
import nexusBookImage from "@/assets/智人之上.jpg";
import alchemistBookImage from "@/assets/牧羊少年奇幻之旅.jpg";
import phoenixProjectBookImage from "@/assets/the-phoenix-project.jpg";
import educatedBookImage from "@/assets/educated.jpg";
import hammerPhilosophyImage from "@/assets/books/friend-hammer-philosophy.jpg";
import soWhatPodcastImage from "../../../assets/so_what.jpg";
import jokeShopImage from "../../../assets/joke_shop.png";
import chatAndChillImage from "../../../assets/chat_chil.png";
import growWithRuiImage from "../../../assets/grow-with-rui-card.png";
import lunaWenBlogImage from "../../../assets/friends_or.jpg";
import arinaDevImage from "../../../assets/friend_web.jpg";
import mapConnectImage from "../../../assets/map_connect_1.png";
import mapXiaohongshuImage from "../../../assets/Make AI Practical Xiaohongshu.png";
import learnAiSeriesImage from "../../../assets/Use AI to Learn AI 100 Series.png";
import bookClubSessionOneImage from "../../../assets/book_club_1.jpg";
import potteryOneImage from "@/assets/web/pottery_1.webp";
import potteryTwoImage from "@/assets/web/pottery_2.webp";
import potteryThreeImage from "@/assets/web/pottery_3.webp";
import splitFictionImage from "@/assets/Split Fiction.png";
import itTakesTwoImage from "@/assets/it_takes_two.png";
import hogwartsLegacyImage from "@/assets/hogwarts_legacy.png";
import pokemonGoImage from "@/assets/pokemon_go.png";
import fanRenImage from "@/assets/donghua-fan-ren.png";
import guangYinImage from "@/assets/donghua-guang-yin.jpg";
import muShenImage from "@/assets/donghua-mu-shen.png";
import xianNiImage from "@/assets/donghua-xian-ni.jpg";
import jianLaiImage from "@/assets/donghua-jian-lai.jpg";
import digitalTwinsCertificate from "@/assets/omdena/omdena-digitaltwins-cert.jpg";
import skyMapsCertificate from "@/assets/omdena/omdena-skymaps-cert.jpg";
import needEnergyImage from "@/assets/omdena/omdena-needenergy.jpg";
import needEnergyCertificate from "@/assets/omdena/omdena-needenergy-cert.jpg";
import brainpoolCertificate from "@/assets/omdena/omdena-brainpool-cert.jpg";

const navIcons = {
  overview: House,
  about: Compass,
  work: Archive,
  community: Network,
  fun: PartyPopper,
  links: Globe2,
  contact: Send,
};
type Language = "en" | "zh";
const languageStorageKey = "portfolio-language";
const focusReturnStorageKey = "portfolio-focus-return";
const tr = (language: Language, en: string, zh: string) =>
  language === "zh" ? zh : en;
const characterPoses: Record<DesktopSection, StaticImageData> = {
  overview: characterImage,
  about: aboutCharacter,
  work: workCharacter,
  community: funCharacter,
  fun: communityCharacter,
  links: linksCharacter,
  contact: contactCharacter,
};

function PersistentFooter({ language }: { language: Language }) {
  return (
    <footer className="desktop-footer">
      <div className="footer-socials">
        <a
          href="https://www.linkedin.com/in/yangyangcai"
          target="_blank"
          rel="noreferrer"
          aria-label={tr(language, "LinkedIn", "领英")}
        >
          <LinkedInMark />
        </a>
        <a
          href="https://github.com/DANancy"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <GitHubMark />
        </a>
        <a
          href="mailto:yangyangcai.au@gmail.com"
          aria-label={tr(language, "Email Yangyang", "给阳阳发邮件")}
        >
          <Mail aria-hidden="true" />
        </a>
      </div>
      <span>
        {"\u00a9"} 2026 {tr(language, "Yangyang Cai", "\u8521\u9633\u9633")}
      </span>
    </footer>
  );
}

export function DesktopPortfolio({
  initialSection = "overview",
}: {
  initialSection?: DesktopSection;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const active = initialSection;
  const language: Language = pathname.startsWith("/zh-hans") ? "zh" : "en";
  const windowRef = useRef<HTMLElement>(null);
  const changeLanguage = useCallback(
    (nextLanguage: Language) => {
      try {
        window.localStorage.setItem(languageStorageKey, nextLanguage);
      } catch {}
      const basePath = active === "overview" ? "/" : "/" + active + "/";
      router.push(nextLanguage === "zh" ? "/zh-hans" + basePath : basePath);
    },
    [active, router],
  );
  const openSection = useCallback(
    (section: DesktopSection) => {
      if (active === "overview" && section !== "overview") {
        try {
          window.sessionStorage.setItem(focusReturnStorageKey, section);
        } catch {}
      }
      const basePath = section === "overview" ? "/" : "/" + section + "/";
      router.push(language === "zh" ? "/zh-hans" + basePath : basePath);
    },
    [active, language, router],
  );
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") openSection("overview");
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [openSection]);
  useEffect(() => {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }, [language]);
  useEffect(() => {
    if (active === "overview") return;
    const frame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      windowRef.current?.scrollTo({ top: 0, behavior: "auto" });
      windowRef.current
        ?.querySelector<HTMLElement>(".contact-page")
        ?.scrollTo({ top: 0, behavior: "auto" });
      windowRef.current?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);
  useEffect(() => {
    if (active !== "overview") return;
    const resetOverviewScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      windowRef.current?.scrollTo({ top: 0, behavior: "auto" });
      windowRef.current
        ?.querySelector<HTMLElement>(".overview-content")
        ?.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };
    resetOverviewScroll();
    const frame = requestAnimationFrame(resetOverviewScroll);
    const timer = window.setTimeout(resetOverviewScroll, 120);
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [active, language]);
  useEffect(() => {
    if (active !== "overview") return;
    let returnTarget = "";
    try {
      returnTarget = window.sessionStorage.getItem(focusReturnStorageKey) ?? "";
      window.sessionStorage.removeItem(focusReturnStorageKey);
    } catch {}
    if (!returnTarget) return;
    const frame = requestAnimationFrame(() =>
      windowRef.current
        ?.querySelector<HTMLElement>(`[data-section-trigger="${returnTarget}"]`)
        ?.focus({ preventScroll: true }),
    );
    return () => cancelAnimationFrame(frame);
  }, [active]);
  useEffect(() => {
    if (active !== "overview")
      window.gtag?.("event", "portfolio_section_view", {
        section: active,
        language,
      });
  }, [active, language]);
  const activeItem = navigation.find((item) => item.id === active);
  const windowLabel =
    active === "overview"
      ? tr(language, "Portfolio overview", "作品集概览")
      : tr(
          language,
          `${activeItem?.label ?? active} section`,
          `${activeItem?.labelZh ?? active}页面`,
        );
  return (
    <main
      className="desktop-shell"
      data-language={language}
      data-section={active}
      onPointerDown={(event) => {
        if (active !== "overview" && event.target === event.currentTarget)
          openSection("overview");
      }}
    >
      <LanguageSwitch language={language} onLanguageChange={changeLanguage} />
      <a className="skip-link" href="#portfolio-window">
        {tr(language, "Skip to portfolio content", "跳到作品集内容")}
      </a>
      <div className="desktop-noise" aria-hidden />
      <div className="window-stage">
        <section
          ref={windowRef}
          id="portfolio-window"
          tabIndex={-1}
          className={`desktop-window ${active === "overview" ? "overview-window" : "section-window"}`}
          aria-label={windowLabel}
          role="region"
        >
          <WindowBar title={windowTitle(active)} />
          {active === "overview" && (
            <Overview
              key={`overview-${language}`}
              onOpen={openSection}
              language={language}
            />
          )}{" "}
          {active === "about" && <About language={language} />}{" "}
          {active === "work" && <Work language={language} />}{" "}
          {active === "community" && <Community language={language} />}{" "}
          {active === "fun" && <Fun language={language} />}{" "}
          {active === "links" && <Links language={language} />}{" "}
          {active === "contact" && <Contact language={language} />}
          {active !== "overview" && (
            <SubpageNavigation
              active={active}
              onNavigate={openSection}
              language={language}
            />
          )}
          {active === "overview" && (
            <div className="window-status">
              <span>
                <i />{" "}
                {tr(language, "Dance with data and AI", "与数据和 AI 共舞")}
              </span>
              <span>
                <i className="amber-dot" />{" "}
                {tr(language, "Feedback is a gift", "反馈是一份礼物")}
              </span>
              <span className="status-right">
                &#10019; {tr(language, "Just do it", "先行动起来")}
              </span>
            </div>
          )}
        </section>
        <Character key={active} active={active} language={language} />
        {active !== "overview" && (
          <button
            className="desktop-floating-close"
            onClick={() => openSection("overview")}
            aria-label={tr(
              language,
              `Close ${activeItem?.label ?? active} window`,
              `关闭${activeItem?.labelZh ?? active}窗口`,
            )}
          >
            <span className="sunflower-close" aria-hidden="true">
              <Flower2 />
              <X />
            </span>
          </button>
        )}
      </div>
      {active === "overview" && (
        <footer className="desktop-footer">
          <div className="footer-socials">
            <a
              href="https://www.linkedin.com/in/yangyangcai"
              target="_blank"
              rel="noreferrer"
              aria-label={tr(language, "LinkedIn", "领英")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
              </svg>
            </a>
            <a
              href="https://github.com/DANancy"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.39.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.06.79 2.14v3.05c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
              </svg>
            </a>
            <a
              href="mailto:yangyangcai.au@gmail.com"
              aria-label={tr(language, "Email Yangyang", "给阳阳发邮件")}
            >
              <Mail aria-hidden="true" />
            </a>
          </div>
          <span>&copy; 2026 {tr(language, "Yangyang Cai", "蔡阳阳")}</span>
        </footer>
      )}
      {active !== "overview" && <PersistentFooter language={language} />}
      <InterestPanel language={language} />
      <div className="original-fruit-background" aria-hidden>
        <Image src={backyardOrchard} alt="" sizes="100vw" priority />
      </div>
    </main>
  );
}

function InterestPanel({ language }: { language: Language }) {
  const [isOpen, setIsOpen] = useState(false);
  const [otherSelected, setOtherSelected] = useState(false);
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const interests = [
    ["AI Workshop", "AI 工作坊"],
    ["Book Club", "读书会"],
    ["1:1 Mentoring Session", "一对一指导"],
    ["Data Engineering Bootcamp", "数据工程训练营"],
    ["Learning Together Newsletter", "一起学习电子通讯"],
  ];

  const submitInterest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitState("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedInterests = formData.getAll("interest").map(String);
    try {
      const response = await fetch("https://formsubmit.co/ajax/yangyangcai.au@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "New Website Interest Registration",
          email: formData.get("email"),
          interests: selectedInterests.join(", "),
          other_session_details: formData.get("otherInterest") || "Not provided",
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setSubmitState("success");
      form.reset();
      setOtherSelected(false);
    } catch {
      setSubmitState("error");
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    panelRef.current?.querySelector<HTMLElement>("input")?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [isOpen]);

  return (
    <div className={`interest-drawer ${isOpen ? "is-open" : ""}`}>
      {isOpen && (
        <button
          className="interest-backdrop"
          type="button"
          aria-label={tr(language, "Close interest form", "关闭意向登记表")}
          onClick={() => setIsOpen(false)}
        />
      )}
      <button
        ref={triggerRef}
        className="interest-trigger"
        type="button"
        aria-label={tr(language, "Register your interest", "登记意向")}
        aria-expanded={isOpen}
        aria-controls="interest-panel"
        onClick={() => setIsOpen((value) => !value)}
      >
        {tr(language, "Register interest", "登记意向")}
      </button>
      <div
        ref={panelRef}
        id="interest-panel"
        className="interest-panel"
        role="dialog"
        aria-modal={isOpen ? "true" : undefined}
        aria-hidden={!isOpen}
        aria-labelledby="interest-panel-title"
      >
        <header>
          <div>
            <span><Sparkles aria-hidden="true" /> {tr(language, "Let’s learn together", "一起学习")}</span>
            <h2 id="interest-panel-title">{tr(language, "Register your interest", "登记您的意向")}</h2>
            <p>{tr(language, "Tell me what you would like to explore. I’ll be in touch when a suitable opportunity is available.", "告诉我您想探索的方向。有合适的活动时，我会与您联系。")}</p>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} aria-label={tr(language, "Close", "关闭")}>
            <X aria-hidden="true" />
          </button>
        </header>
        {submitState === "success" ? (
          <div className="interest-success" role="status">
            <span><Send aria-hidden="true" /></span>
            <h3>{tr(language, "Successfully Submitted", "提交成功")}</h3>
            <p>{tr(language, "Thank you for registering your interest. I’ve received your details and will be in touch when a relevant opportunity is available.", "感谢您登记意向。我已收到您的信息，有合适的机会时会与您联系。")}</p>
            <button type="button" onClick={() => { setSubmitState("idle"); setIsOpen(false); }}>
              {tr(language, "Done", "完成")}
            </button>
          </div>
        ) : <form onSubmit={submitInterest}>
          <input type="hidden" name="_subject" value="New website interest registration" />
          <input type="hidden" name="_captcha" value="false" />
          <fieldset className="interest-session-fieldset">
            <legend><span>1</span>{tr(language, "Choose Your Sessions", "选择您感兴趣的活动")}</legend>
            <div className="interest-options">
              {interests.map(([en, zh]) => (
                <label key={en}>
                  <input type="checkbox" name="interest" value={en} />
                  <span>{tr(language, en, zh)}</span>
                </label>
              ))}
              <label className="interest-option-other">
                <input
                  type="checkbox"
                  name="interest"
                  value="Other Session"
                  checked={otherSelected}
                  onChange={(event) => setOtherSelected(event.target.checked)}
                />
                <span>{tr(language, "Other Session", "其他活动")}</span>
              </label>
            </div>
          </fieldset>
          {otherSelected && (
            <label className="interest-custom-session">
              <span>{tr(language, "Tell Me What You’re Interested In", "请告诉我您感兴趣的内容")}</span>
              <textarea
                name="otherInterest"
                rows={3}
                placeholder={tr(language, "Describe the session, topic, or support you’re looking for…", "请描述您希望参加的活动、主题或需要的支持……")}
                required
                autoFocus
              />
            </label>
          )}
          <label className="interest-email">
            <span><i>2</i>{tr(language, "Your Email Address", "您的邮箱地址")}</span>
            <input name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
          </label>
          {submitState === "error" && (
            <p className="interest-submit-error" role="alert">
              {tr(language, "Something went wrong. Please check your connection and try again.", "提交失败，请检查网络连接后重试。")}
            </p>
          )}
          <button className="interest-submit" type="submit" disabled={submitState === "submitting"}>
            <Send aria-hidden="true" /> {submitState === "submitting" ? tr(language, "Submitting…", "正在提交……") : tr(language, "Submit My Interest", "提交意向")}
          </button>
          <small>{tr(language, "No spam—just a personal reply when there’s a relevant opportunity.", "不会发送垃圾邮件，仅在有相关机会时亲自回复。")}</small>
        </form>}
      </div>
    </div>
  );
}

function SubpageNavigation({
  active,
  onNavigate,
  language,
}: {
  active: DesktopSection;
  onNavigate: (section: DesktopSection) => void;
  language: Language;
}) {
  const navRef = useRef<HTMLElement>(null);
  const items = [
    { id: "overview" as const, label: "Home", labelZh: "首页" },
    ...navigation,
  ];
  useEffect(() => {
    const nav = navRef.current;
    const selected = nav?.querySelector<HTMLElement>("[aria-current='page']");
    if (nav && selected) {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      nav.scrollTo({
        left:
          selected.offsetLeft - (nav.clientWidth - selected.offsetWidth) / 2,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  }, [active]);
  return (
    <nav
      ref={navRef}
      className="subpage-nav"
      aria-label={tr(language, "Subpage navigation", "子页面导航")}
    >
      {items.map((item) => {
        const Icon = navIcons[item.id];
        const isActive = active === item.id;
        const label = language === "zh" ? item.labelZh : item.label;
        return (
          <button
            key={item.id}
            className={isActive ? "active" : ""}
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? "page" : undefined}
            aria-label={
              isActive
                ? tr(
                    language,
                    `Current section: ${label}`,
                    `当前页面：${label}`,
                  )
                : label
            }
          >
            <Icon />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function WindowBar({ title }: { title: string }) {
  return (
    <header className="window-bar">
      <span />
      <b>{title}</b>
      <span />
    </header>
  );
}
function ScrollHint({ language }: { language: Language }) {
  return (
    <p className="scroll-hint" aria-hidden="true">
      {tr(language, "Scroll to explore →", "横向滚动查看更多 →")}
    </p>
  );
}

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
}) {
  return (
    <header className="page-intro">
      <p className="page-pill">{eyebrow}</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </header>
  );
}

function ProjectVisitLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  if (href.startsWith("http"))
    return (
      <a className="project-visit" href={href} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  return (
    <Link className="project-visit" href={href}>
      {children}
    </Link>
  );
}

function ExpandableImage({
  src,
  alt,
  width,
  height,
  sizes,
  unoptimized = false,
  language,
  className = "",
}: {
  src: StaticImageData | string;
  alt: string;
  width: number;
  height: number;
  sizes?: string;
  unoptimized?: boolean;
  language: Language;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button
        type="button"
        className={`expandable-image ${className}`}
        onClick={() => dialogRef.current?.showModal()}
        aria-label={tr(language, `Enlarge image: ${alt}`, `放大图片：${alt}`)}
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          unoptimized={unoptimized}
        />
      </button>
      <dialog
        ref={dialogRef}
        className="image-lightbox"
        aria-label={alt}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <button
          type="button"
          className="image-lightbox-close"
          onClick={() => dialogRef.current?.close()}
          aria-label={tr(language, "Close enlarged image", "关闭大图")}
        >
          <X aria-hidden="true" />
        </button>
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          sizes="95vw"
          unoptimized={unoptimized}
        />
      </dialog>
    </>
  );
}

function LanguageSwitch({
  language,
  onLanguageChange,
}: {
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  return (
    <div
      className="language-switch"
      role="group"
      aria-label={tr(language, "Language", "语言")}
    >
      <button
        type="button"
        className={language === "en" ? "active" : ""}
        aria-pressed={language === "en"}
        aria-label={tr(language, "Switch to English", "切换到英文")}
        onClick={() => onLanguageChange("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={language === "zh" ? "active" : ""}
        aria-pressed={language === "zh"}
        aria-label={tr(language, "Switch to Chinese", "切换到中文")}
        onClick={() => onLanguageChange("zh")}
      >
        中文
      </button>
    </div>
  );
}

function Character({
  active,
  language,
}: {
  active: DesktopSection;
  language: Language;
}) {
  const [greeting, setGreeting] = useState(false);
  return (
    <button
      type="button"
      className={`desktop-character character-${active}`}
      onClick={() => setGreeting((value) => !value)}
      aria-label={tr(language, "Say hello to Yangyang", "向阳阳打招呼")}
    >
      {greeting && (
        <span className="character-greeting" role="status">
          {tr(language, "Hi!", "你好！")}
        </span>
      )}
      <Image
        src={characterPoses[active]}
        alt=""
        width={393}
        height={373}
        priority
      />
    </button>
  );
}

function Overview({
  onOpen,
  language,
}: {
  onOpen: (section: DesktopSection) => void;
  language: Language;
}) {
  return (
    <div className="overview-content">
      <h1>
        <span>{tr(language, "hi!", "你好！")}</span>{" "}
        <strong>{tr(language, "i’m Yangyang", "我是阳阳")}</strong>
      </h1>
      <nav
        className="desktop-nav"
        aria-label={tr(language, "Portfolio sections", "作品集栏目")}
      >
        {navigation.map((item) => {
          const Icon = navIcons[item.id];
          return (
            <button
              type="button"
              key={item.id}
              data-section-trigger={item.id}
              onClick={() => onOpen(item.id)}
            >
              <span className={`nav-icon ${item.tone}`} aria-hidden="true">
                <Icon size={24} />
              </span>
              <b>{language === "zh" ? item.labelZh : item.label}</b>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function About({ language }: { language: Language }) {
  return (
    <div className="window-page about-page">
      <PageIntro
        eyebrow={tr(language, "Professional profile", "职业简介")}
        title={
          <>
            {tr(language, "Building the bridge between", "连接")}{" "}
            <em>{tr(language, "Data", "数据")}</em> {tr(language, "and", "与")}{" "}
            <strong>{tr(language, "Intelligence.", "智能。")}</strong>
          </>
        }
        description={tr(
          language,
          "Based in Melbourne, I am a Senior Data Engineer and Data Magician working in renewable energy. I love getting curious about messy problems, dancing with data and AI, and turning ideas into practical products that people can genuinely use.",
          "我常驻墨尔本，是一名深耕可再生能源领域的高级数据工程师与数据魔法师。我喜欢对复杂问题保持好奇，与数据和 AI 共舞，并把想法转化为人们真正用得上的实用产品。",
        )}
      />
      <h3>{tr(language, "Working style", "工作方式")}</h3>
      <div className="style-chips">
        <span>
          <Wrench size={15} />
          {tr(language, "Practical", "务实")}
        </span>
        <span>
          <Terminal size={15} />
          {tr(language, "Technical", "技术导向")}
        </span>
        <span>
          <Lightbulb size={15} />
          {tr(language, "Curious", "保持好奇")}
        </span>
      </div>
      <section className="personal-principles">
        <h3 className="principles-heading">
          {tr(language, "Principles I work by", "我的行事原则")}
        </h3>
        <div className="principles-grid">
          <article>
            <Compass />
            <strong>
              {tr(language, "Dance with data and AI", "与数据和 AI 共舞")}
            </strong>
          </article>
          <article>
            <Lightbulb />
            <strong>
              {tr(language, "Feedback is a gift", "反馈是一份礼物")}
            </strong>
          </article>
          <article>
            <Heart />
            <strong>
              {tr(
                language,
                "Knowledge grows through sharing",
                "知识因分享而成长",
              )}
            </strong>
          </article>
          <article>
            <Sparkles />
            <strong>{tr(language, "Just do it", "先行动起来")}</strong>
          </article>
        </div>
      </section>
      <hr />
      <section className="beyond-work">
        <p className="page-pill">
          {tr(language, "Life beyond work", "工作之外的生活")}
        </p>
        <h3>
          {tr(language, "Enjoying life is the key.", "享受生活，才是关键。")}
        </h3>
        <p>
          {tr(
            language,
            "For me, a good life leaves room for curiosity, imagination, and the occasional unexpected side quest.",
            "对我来说，美好的生活要为好奇心、想象力和偶尔出现的意外支线任务留出空间。",
          )}
        </p>
        <div className="beyond-grid">
          <article>
            <span className="interest-icon game">
              <Gamepad2 />
            </span>
            <b>{tr(language, "Video games", "电子游戏")}</b>
            <small>
              {tr(
                language,
                "Co-op adventures, imaginative worlds, and the joy of solving problems together.",
                "合作冒险、充满想象力的世界，以及一起解决问题的乐趣。",
              )}
            </small>
          </article>
          <article>
            <span className="interest-icon books">
              <BookOpen />
            </span>
            <b>{tr(language, "Books & reading", "书籍与阅读")}</b>
            <small>
              {tr(
                language,
                "Fantasy, fresh perspectives, and ideas that stay with me beyond the final page.",
                "奇幻故事、新鲜视角，以及读完后依然留在心里的想法。",
              )}
            </small>
          </article>
          <article>
            <span className="interest-icon explore">
              <Sparkles />
            </span>
            <b>{tr(language, "New experiences", "新鲜体验")}</b>
            <small>
              {tr(
                language,
                "New crafts, unfamiliar places, and saying yes to small adventures.",
                "新手艺、陌生的地方，以及欣然接受每一次小冒险。",
              )}
            </small>
          </article>
          <article>
            <span className="interest-icon animation">
              <Tv />
            </span>
            <b>{tr(language, "Animation & donghua", "动画与国漫")}</b>
            <small>
              {tr(
                language,
                "Chinese animation is a favourite, especially A Record of a Mortal’s Journey to Immortality.",
                "我很喜欢中国动画，尤其是《凡人修仙传》。",
              )}
            </small>
          </article>
        </div>
      </section>
    </div>
  );
}

function Work({ language }: { language: Language }) {
  const ProjectIcons = [BriefcaseBusiness, Presentation, GraduationCap, Store];
  const ProjectPreviews = [
    null,
    null,
    bootcampLifecycleImage,
    homeEssentialsImage,
  ];
  return (
    <div className="window-page work-page">
      <PageIntro
        eyebrow={tr(language, "Built with Passion", "以热爱构建")}
        title={tr(
          language,
          "Data Lover. Practical Builder.",
          "热爱数据，也热衷把想法变成现实。",
        )}
        description={tr(
          language,
          "From reliable data platforms to shared learning and hands-on ideas, this is where curiosity turns into something useful.",
          "从可靠的数据平台，到知识分享与亲手实践，这里记录着好奇心如何变成真正有用的成果。",
        )}
      />
      <div className="project-grid">
        {projects.map((project, index) => {
          const Icon = ProjectIcons[index];
          const title = language === "zh" ? project.titleZh : project.title;
          const tags =
            language === "zh" ? (project.tagsZh ?? project.tags) : project.tags;
          const preview = ProjectPreviews[index];
          return (
            <article key={project.title}>
              <div className={`project-icon ${project.tone}`}>
                <Icon aria-hidden="true" />
              </div>
              <ExternalLink
                className={`card-link ${project.href ? "" : "muted-link"}`}
                aria-hidden="true"
                size={17}
              />
              <h3>{title}</h3>
              <p>
                {language === "zh"
                  ? project.descriptionZh
                  : project.description}
              </p>
              {preview && (
                <div className="project-preview">
                  <ExpandableImage
                    src={preview}
                    alt={
                      index === 2
                        ? tr(
                            language,
                            "Preview of the self-designed 12-session (18-hour) AI-Data Engineering Bootcamp lifecycle",
                            "自主设计、共 12 节（18 小时）的 AI 数据工程训练营生命周期预览图",
                          )
                        : tr(
                            language,
                            "Preview of the Home Essentials online store",
                            "Home Essentials 在线商店预览图",
                          )
                    }
                    width={preview.width}
                    height={preview.height}
                    sizes="(max-width: 760px) 90vw, 520px"
                    language={language}
                    className="project-preview-expand"
                  />
                </div>
              )}
              {project.href && (
                <ProjectVisitLink href={project.href}>
                  {language === "zh"
                    ? (project.linkLabelZh ?? title)
                    : (project.linkLabel ?? `Visit ${project.title}`)}{" "}
                  <ExternalLink aria-hidden="true" size={14} />
                </ProjectVisitLink>
              )}
              <div>
                {tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
      <OmdenaExperience language={language} />
      <ReadingNext language={language} />
      <ToolsAndSkills language={language} />
      <LearningNext language={language} />
    </div>
  );
}

function ReadingNext({ language }: { language: Language }) {
  const topics = [
    tr(language, "Customer discovery", "客户洞察"),
    tr(language, "AI delivery", "AI 交付"),
    tr(language, "Value creation", "价值创造"),
  ];
  return (
    <section className="learning-roadmap reading-next-section">
      <header>
        <p className="page-pill">
          {tr(language, "Reading next", "下一步阅读")}
        </p>
        <h3>{tr(language, "Ideas Worth Studying", "值得深入学习的理念")}</h3>
        <p>
          {tr(
            language,
            "Professional books and guides I am working through to strengthen practical engineering and delivery skills.",
            "通过专业书籍与指南，持续提升实用工程能力与交付能力。",
          )}
        </p>
      </header>
      <div className="learning-grid reading-next-grid">
        <article className="learning-card blue">
          <span className="learning-card-icon">
            <BookOpen aria-hidden="true" />
          </span>
          <p className="learning-card-label">
            {tr(language, "Professional reading", "专业阅读")}
          </p>
          <h4>The Guidance Book of Forward Deployed Engineer</h4>
          <p>
            {tr(
              language,
              "Study how Forward Deployed Engineers turn AI capability into customer value, from finding the right problem to delivering repeatable solutions.",
              "学习前线部署工程师如何将 AI 能力转化为客户价值，从找对问题到交付可重复使用的解决方案。",
            )}
          </p>
          <div>
            {topics.map((topic) => (
              <span key={topic}>{topic}</span>
            ))}
          </div>
          <a
            href="https://github.com/xdash/FDE-the-Guidance-Book-of-Forward-Deployed-Engineer/"
            target="_blank"
            rel="noreferrer"
          >
            {tr(language, "Read on GitHub", "在 GitHub 阅读")}
            <ExternalLink size={14} />
          </a>
        </article>
      </div>
    </section>
  );
}

function ToolsAndSkills({ language }: { language: Language }) {
  const tools = [
    {
      title: "UI/UX Pro Max",
      label: tr(language, "Design intelligence skill", "设计智能技能"),
      description: tr(
        language,
        "A searchable design-intelligence skill I use to shape design systems, responsive interfaces, accessibility, colour, typography, and implementation decisions.",
        "一个可搜索的设计智能技能，用于指导设计系统、响应式界面、无障碍、色彩、字体与实现决策。",
      ),
      topics: [
        tr(language, "Design systems", "设计系统"),
        tr(language, "Accessibility", "无障碍"),
        tr(language, "Responsive UI", "响应式界面"),
      ],
      href: "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
      linkLabel: tr(language, "Explore the skill", "了解该技能"),
      watchHref: null,
      watchLabel: null,
      icon: Sparkles,
      tone: "green",
    },
    {
      title: "OpenMontage",
      label: tr(language, "Creative production tool", "创意制作工具"),
      description: tr(
        language,
        "An open-source agentic video-production system I am exploring for research, scripting, asset generation, editing, subtitles, and final composition.",
        "一个正在探索的开源智能体视频制作系统，涵盖调研、脚本、素材生成、剪辑、字幕与最终合成。",
      ),
      topics: [
        tr(language, "Agentic video", "智能体视频"),
        tr(language, "Media pipelines", "媒体工作流"),
        "Remotion",
      ],
      href: "https://github.com/calesthio/OpenMontage",
      linkLabel: tr(language, "Explore OpenMontage", "了解 OpenMontage"),
      watchHref: null,
      watchLabel: null,
      icon: Tv,
      tone: "purple",
    },
    {
      title: "Hell Grind · Higgsfield",
      label: tr(language, "Open-source filmmaking study", "开源电影制作学习"),
      description: tr(
        language,
        "Study how a feature-length AI movie was reportedly produced by a 15-person team in 14 days using Higgsfield. The Hell Grind team is turning its production playbook into an open-source textbook, including its prompt pipelines and character-consistency frameworks. I am exploring its production approach alongside OpenMontage.",
        "研究一支 15 人团队如何据报道在 14 天内使用 Higgsfield 制作一部长篇 AI 电影。Hell Grind 团队正将制作方法整理成开源教材，分享提示词流水线与角色一致性框架；我也将其制作方法与 OpenMontage 结合学习。",
      ),
      topics: [
        tr(language, "Prompt pipelines", "提示词流水线"),
        tr(language, "Character consistency", "角色一致性"),
        tr(language, "AI film editing", "AI 电影剪辑"),
      ],
      href: "https://higgsfield.ai/@higgsfield.studio/projects/hell-grind",
      linkLabel: tr(
        language,
        "Explore the Hell Grind project",
        "查看 Hell Grind 项目",
      ),
      watchHref: null,
      watchLabel: null,
      icon: Clapperboard,
      tone: "orange",
    },
  ];
  return (
    <section className="learning-roadmap tools-skills-section">
      <header>
        <p className="page-pill">
          {tr(language, "Tools & skills", "工具与技能")}
        </p>
        <h3>
          {tr(
            language,
            "Creative Systems That Expand How I Build",
            "拓展创造方式的实用系统",
          )}
        </h3>
        <p>
          {tr(
            language,
            "Design intelligence, open-source production tools, and real AI filmmaking case studies that support more thoughtful, polished, and expressive work.",
            "通过设计智能、开源制作工具与真实的 AI 电影案例，让作品更有思考、更精致，也更具表现力。",
          )}
        </p>
      </header>
      <div className="learning-grid tools-skills-grid">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <article className={`learning-card ${tool.tone}`} key={tool.title}>
              <span className="learning-card-icon">
                <Icon aria-hidden="true" />
              </span>
              <p className="learning-card-label">{tool.label}</p>
              <h4>{tool.title}</h4>
              <p>{tool.description}</p>
              <div>
                {tool.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
              <a href={tool.href} target="_blank" rel="noreferrer">
                {tool.linkLabel}
                <ExternalLink size={14} />
              </a>
              {tool.watchHref && (
                <a href={tool.watchHref} target="_blank" rel="noreferrer">
                  {tool.watchLabel}
                  <ExternalLink size={14} />
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function LearningNext({ language }: { language: Language }) {
  const goals = [
    {
      title: "Claude Certified Architect - Foundations",
      label: tr(language, "Certification goal", "认证目标"),
      description: tr(
        language,
        "Prepare for the CCA-F credential and deepen my ability to design reliable production systems with Claude, Claude Code, agentic patterns, tools, and MCP.",
        "准备 CCA-F 认证，并深化使用 Claude、Claude Code、智能体架构、工具与 MCP 设计可靠生产系统的能力。",
      ),
      topics: [
        tr(language, "Agentic architecture", "智能体架构"),
        tr(language, "Tools & MCP", "工具与 MCP"),
        tr(language, "Reliability", "可靠性"),
      ],
      href: "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification",
      linkLabel: tr(language, "View certification", "查看认证"),
      icon: GraduationCap,
      tone: "orange",
    },
    {
      title: "Databricks AI Systems",
      label: tr(language, "Platform learning", "平台学习"),
      description: tr(
        language,
        "Learn how Genie One, Genie Agents, and Genie Ontology combine enterprise data, business context, autonomous actions, and governance to create trustworthy AI systems.",
        "学习 Genie One、Genie Agents 与 Genie Ontology 如何结合企业数据、业务上下文、自主行动与治理，构建值得信赖的 AI 系统。",
      ),
      topics: [
        tr(language, "Genie agents", "Genie 智能体"),
        tr(language, "Business ontology", "业务本体"),
        tr(language, "AI governance", "AI 治理"),
      ],
      href: "https://www.databricks.com/blog/introducing-genie-one-genie-ontology-and-genie-agents",
      linkLabel: tr(language, "Explore Databricks AI", "了解 Databricks AI"),
      icon: Network,
      tone: "green",
    },
    {
      title: "Pi Coding Agent",
      label: tr(language, "Agent workflows", "智能体工作流"),
      description: tr(
        language,
        "Explore a minimal, extensible agent harness and learn how to shape coding agents around real engineering workflows through extensions, skills, and context engineering.",
        "探索一个精简且可扩展的智能体框架，学习如何通过扩展、技能与上下文工程，让编码智能体适应真实的工程工作流。",
      ),
      topics: [
        tr(language, "Agent harnesses", "智能体框架"),
        tr(language, "Extensions & skills", "扩展与技能"),
        tr(language, "Context engineering", "上下文工程"),
      ],
      href: "https://pi.dev/",
      linkLabel: tr(language, "Explore Pi", "探索 Pi"),
      icon: Terminal,
      tone: "purple",
    },
    {
      title: "Salesforce Marketing Cloud Engagement",
      label: tr(language, "Platform learning", "平台学习"),
      description: tr(
        language,
        "Learn how customer data, segmentation, journeys, and automation work together to create more relevant cross-channel engagement.",
        "学习客户数据、用户分群、旅程设计与自动化如何协同，打造更相关的跨渠道客户互动。",
      ),
      topics: [
        tr(language, "Customer journeys", "客户旅程"),
        tr(language, "Data management", "数据管理"),
        tr(language, "Automation Studio", "自动化工作室"),
      ],
      href: "https://trailhead.salesforce.com/content/learn/trails/develop-for-marketing-cloud",
      linkLabel: tr(language, "Learn on Trailhead", "在 Trailhead 学习"),
      icon: Mail,
      tone: "blue",
    },
  ];
  return (
    <section className="learning-roadmap">
      <header>
        <p className="page-pill">
          {tr(language, "Learning next", "下一步学习")}
        </p>
        <h3>
          {tr(
            language,
            "Learning, Building, and Staying Curious",
            "持续学习，动手实践，保持好奇",
          )}
        </h3>
        <p>
          {tr(
            language,
            "Four directions I am exploring through certification, platforms, tools, and hands-on practice.",
            "通过认证、平台、工具与动手实践，探索四个新的方向。",
          )}
        </p>
      </header>
      <ScrollHint language={language} />
      <div
        className="learning-grid"
        role="region"
        tabIndex={0}
        aria-label={tr(
          language,
          "Scrollable learning shelf",
          "可横向滚动的学习计划",
        )}
      >
        {goals.map((goal) => {
          const Icon = goal.icon;
          return (
            <article className={`learning-card ${goal.tone}`} key={goal.title}>
              <span className="learning-card-icon">
                <Icon aria-hidden="true" />
              </span>
              <p className="learning-card-label">{goal.label}</p>
              <h4>{goal.title}</h4>
              <p>{goal.description}</p>
              <div>
                {goal.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>
              <a href={goal.href} target="_blank" rel="noreferrer">
                {goal.linkLabel}
                <ExternalLink size={14} />
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
}
function OmdenaExperience({ language }: { language: Language }) {
  return (
    <section className="omdena-experience">
      <header className="omdena-heading">
        <div>
          <p className="page-pill">
            {tr(language, "Volunteer experience", "志愿者经历")}
          </p>
          <h3>Omdena</h3>
          <p>
            {tr(
              language,
              "I collaborated with global teams on four real-world AI challenges, growing from Machine Learning Engineer to Lead Machine Learning Engineer.",
              "我与全球团队协作完成了四项真实世界 AI 挑战，并从机器学习工程师成长为首席机器学习工程师。",
            )}
          </p>
        </div>
        <a href="https://www.omdena.com/" target="_blank" rel="noreferrer">
          {tr(language, "Visit Omdena", "访问 Omdena")}{" "}
          <ExternalLink size={15} />
        </a>
      </header>
      <div className="omdena-projects omdena-featured">
        <article>
          <span className="omdena-date">04.2021</span>
          <h4>NeedEnergy</h4>
          <p>
            {tr(
              language,
              "Contributed across the full data workflow, from collection and preparation to predictive modelling, an hourly ETL pipeline, and a Streamlit deployment on Heroku. I presented the final project and progressed to Lead ML Engineer.",
              "参与完整的数据工作流，从数据采集与整理，到预测建模、每小时 ETL 管道，以及在 Heroku 上部署 Streamlit 应用。我担任最终项目展示者，并成长为首席机器学习工程师。",
            )}
          </p>
          <div className="omdena-tags">
            {[
              "Python",
              "ETL",
              "Streamlit",
              "AWS",
              tr(language, "Predictive modelling", "预测建模"),
            ].map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <ExpandableImage
            src={needEnergyImage}
            alt={tr(
              language,
              "Omdena NeedEnergy Lead ML Engineer announcement",
              "Omdena NeedEnergy 首席机器学习工程师公告",
            )}
            width={1080}
            height={1080}
            language={language}
            className="need-energy-expand"
          />
          <div className="omdena-project-links">
            <a
              href="https://www.omdena.com/projects/clean-energy-ai"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                {tr(
                  language,
                  "Increasing clean energy access in Africa",
                  "通过 AI 提升非洲清洁能源可及性",
                )}
              </span>
              <ExternalLink size={14} />
            </a>
            <a
              href={needEnergyCertificate.src}
              target="_blank"
              rel="noreferrer"
            >
              {tr(language, "View certificate", "查看证书")}{" "}
              <ExternalLink size={14} />
            </a>
          </div>
        </article>
      </div>
      <section className="omdena-more">
        <h4>{tr(language, "More collaborations", "更多协作项目")}</h4>
        <div className="omdena-projects omdena-projects-compact">
          <article>
            <span className="omdena-date">07.2021</span>
            <h4>SkyMaps</h4>
            <p>
              {tr(
                language,
                "Annotated drone imagery and contributed to a computer-vision workflow for distinguishing weeds from crops, supporting more precise herbicide use with lower environmental impact.",
                "完成无人机影像标注，并参与区分杂草与作物的计算机视觉工作流，以支持更精准、环境影响更低的除草剂使用。",
              )}
            </p>
            <div className="omdena-tags">
              {[
                tr(language, "Computer vision", "计算机视觉"),
                tr(language, "Image annotation", "图像标注"),
                tr(language, "Drone imagery", "无人机影像"),
              ].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="omdena-project-links">
              <a
                href="https://www.omdena.com/blog/image-segmentation-techniques-for-weed-or-crop-detection"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  {tr(
                    language,
                    "Weed and crop detection from drone imagery",
                    "利用无人机影像识别杂草与作物",
                  )}
                </span>
                <ExternalLink size={14} />
              </a>
              <a href={skyMapsCertificate.src} target="_blank" rel="noreferrer">
                {tr(language, "View certificate", "查看证书")}{" "}
                <ExternalLink size={14} />
              </a>
            </div>
          </article>
          <article>
            <span className="omdena-date">08.2021</span>
            <h4>Digital Twins</h4>
            <p>
              {tr(
                language,
                "Co-led the knowledge task for converting labelled P&ID images and PDFs into structured data. I worked on ruler removal, symbol, line and text detection, relationship mapping, and a DagsHub deployment pipeline.",
                "共同负责将标注后的 P&ID 图像和 PDF 转化为结构化数据的知识任务，参与标尺移除、符号、线条与文字检测、关系映射，以及 DagsHub 部署管道开发。",
              )}
            </p>
            <div className="omdena-tags">
              {[
                tr(language, "Computer vision", "计算机视觉"),
                "P&ID",
                "OCR",
                "DagsHub",
              ].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="omdena-project-links">
              <a
                href="https://www.omdena.com/projects/energy-transformation"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  {tr(
                    language,
                    "Digital Twins for industrial facilities",
                    "工业设施数字孪生",
                  )}
                </span>
                <ExternalLink size={14} />
              </a>
              <a
                href={digitalTwinsCertificate.src}
                target="_blank"
                rel="noreferrer"
              >
                {tr(language, "View certificate", "查看证书")}{" "}
                <ExternalLink size={14} />
              </a>
            </div>
          </article>
          <article>
            <span className="omdena-date">02.2022</span>
            <h4>Brainpool</h4>
            <p>
              {tr(
                language,
                "Participated in a collaborative plant-health project exploring how drone imagery and environmental sensor data could support prediction and drought management.",
                "参与植物健康协作项目，探索如何利用无人机影像与环境传感器数据支持健康预测和干旱管理。",
              )}
            </p>
            <div className="omdena-tags">
              {[
                tr(language, "Drone imagery", "无人机影像"),
                tr(language, "Sensor data", "传感器数据"),
                tr(language, "Predictive analysis", "预测分析"),
              ].map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="omdena-project-links">
              <a
                href="https://www.omdena.com/blog/data-centric-ai-water-irrigation-system"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  {tr(
                    language,
                    "Data-centric AI for sustainable irrigation",
                    "面向可持续灌溉的数据中心型 AI",
                  )}
                </span>
                <ExternalLink size={14} />
              </a>
              <a
                href={brainpoolCertificate.src}
                target="_blank"
                rel="noreferrer"
              >
                {tr(language, "View certificate", "查看证书")}{" "}
                <ExternalLink size={14} />
              </a>
            </div>
          </article>
        </div>
      </section>
    </section>
  );
}
function Community({ language }: { language: Language }) {
  const [workshopSubmitState, setWorkshopSubmitState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const submitWorkshopInterest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWorkshopSubmitState("submitting");
    const form = event.currentTarget;
    const formData = new FormData(form);
    try {
      const response = await fetch("https://formsubmit.co/ajax/yangyangcai.au@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Build Your Knowledge Agent — New Workshop Interest",
          email: formData.get("email"),
          workshop: "Build Your Knowledge Agent — Next Session",
        }),
      });
      if (!response.ok) throw new Error("Submission failed");
      setWorkshopSubmitState("success");
      form.reset();
    } catch {
      setWorkshopSubmitState("error");
    }
  };
  return (
    <div className="window-page community-page">
      <PageIntro
        eyebrow={tr(language, "Community", "社区")}
        title={tr(language, "Community & Connections.", "社区与连接")}
        description={tr(
          language,
          "The communities I help build and the industry events that create opportunities to learn, exchange ideas, and form meaningful professional connections.",
          "我参与建设的社区，以及帮助人们学习、交流想法并建立有意义职业联系的行业活动。",
        )}
      />
      <div className="community-layout">
        <div className="community-copy">
          <header className="community-organisation-heading">
            <p>
              {tr(
                language,
                "Melbourne-based not-for-profit organisation",
                "总部位于墨尔本的非营利组织",
              )}
            </p>
            <h2>Make AI Practical</h2>
            <small>
              {tr(
                language,
                "Board Member · Workshops · Community learning",
                "董事会成员 · 工作坊 · 社区学习",
              )}
            </small>
          </header>
          <p className="community-summary">
            {tr(
              language,
              "MAP is a Melbourne-based not-for-profit organisation registered in Victoria and a community of more than 100 people learning AI by building practical solutions and sharing what works. It is welcoming, hands-on, and focused on helping people apply AI in their everyday work.",
              "MAP 是一个总部位于墨尔本、在维多利亚州注册的非营利组织，也是一个由 100 多人组成的 AI 学习社区。成员通过构建实用解决方案和分享有效经验来学习 AI。社区开放友好、注重实践，致力于帮助人们在日常工作中应用 AI。",
            )}
          </p>
          <div className="community-values">
            <article>
              <Wrench aria-hidden="true" />
              <span>
                <b>{tr(language, "Hands-on workshops", "动手工作坊")}</b>
                <small>
                  {tr(
                    language,
                    "Build something real with AI step by step and leave with a working example, not just notes.",
                    "一步一步用 AI 构建真实成果，带走可运行的示例，而不只是笔记。",
                  )}
                </small>
              </span>
            </article>
            <article>
              <Presentation aria-hidden="true" />
              <span>
                <b>{tr(language, "Showcase demos", "成果展示")}</b>
                <small>
                  {tr(
                    language,
                    "Members share what they shipped, what did not work, and what they learned along the way.",
                    "社区成员分享已经完成的作品、遇到的问题，以及实践过程中的经验。",
                  )}
                </small>
              </span>
            </article>
            <article>
              <Network aria-hidden="true" />
              <span>
                <b>{tr(language, "Coffee chats or online connect", "咖啡交流或线上联系")}</b>
                <small>
                  {tr(
                    language,
                    "Small, informal conversations for exchanging useful ideas, asking questions, and meeting fellow builders.",
                    "通过轻松的小型交流，分享实用想法、提出问题，并认识更多实践者。",
                  )}
                </small>
              </span>
            </article>
          </div>
          <div className="community-actions">
            <a
              className="solid-button"
              href="https://www.makeaipractical.com.au/"
              target="_blank"
              rel="noreferrer"
            >
              <Globe2 size={17} />
              {tr(language, "Visit website", "访问官网")}
            </a>
            <a
              className="outline-button"
              href="https://www.linkedin.com/company/make-ai-practical"
              target="_blank"
              rel="noreferrer"
            >
              <LinkIcon size={17} />
              {tr(language, "LinkedIn", "领英")}
            </a>
          </div>
          <div className="community-social-images">
            <figure>
              <ExpandableImage
                src={mapXiaohongshuImage}
                alt={tr(language, "Make AI Practical Xiaohongshu", "Make AI Practical 小红书")}
                width={mapXiaohongshuImage.width}
                height={mapXiaohongshuImage.height}
                sizes="(max-width: 520px) 100vw, 220px"
                language={language}
              />
              <figcaption>{tr(language, "MAP on Xiaohongshu", "MAP 小红书")}</figcaption>
            </figure>
            <figure>
              <ExpandableImage
                src={learnAiSeriesImage}
                alt={tr(language, "Use AI to Learn AI 100 Series", "用 AI 学 AI 100 系列")}
                width={learnAiSeriesImage.width}
                height={learnAiSeriesImage.height}
                sizes="(max-width: 520px) 100vw, 220px"
                language={language}
              />
              <figcaption>{tr(language, "Use AI to Learn AI · 100 Series", "用 AI 学 AI · 100 系列")}</figcaption>
            </figure>
          </div>
        </div>
        <aside className="curriculum-card">
          <ExpandableImage
            src={mapConnectImage}
            alt={tr(
              language,
              "MAP Connect 1 online event poster",
              "MAP Connect 首场线上活动海报",
            )}
            width={mapConnectImage.width}
            height={mapConnectImage.height}
            sizes="(max-width: 760px) 100vw, 36vw"
            language={language}
          />
        </aside>
        <section className="community-invite community-upcoming">
          <div className="upcoming-event-badge"><CalendarDays aria-hidden="true" />{tr(language, "Upcoming event", "即将开始")}</div>
          <header>
            <span><Network aria-hidden="true" /></span>
            <div>
              <p>MAP Connect 1</p>
              <h3>{tr(language, "AI Won't Take Your Job. It Will Reprice You.", "在 AI 公司工作一年：我看清的职场生存真相")}</h3>
              <small>{tr(language, "An honest conversation about work, AI, and personal growth", "一场关于职场、AI 与个人成长的真实对话")}</small>
            </div>
          </header>
          <p className="community-invite-description">
            {tr(language, "Not in Melbourne or short on time? Join this free, low-pressure 60-minute online conversation. Michelle shares what a year inside an AI company taught her about changing roles, scarce skills, and staying valuable in the age of AI.", "不在墨尔本或没时间参加线下？来参加这场免费、低社交压力的 60 分钟线上分享。Michelle 将结合一年的 AI 公司经历，聊聊职位转变、正在变稀缺的能力，以及如何在 AI 时代保持竞争力。")}
          </p>
          <div className="community-invite-details">
            <span><CalendarDays aria-hidden="true" /><small>{tr(language, "Date", "日期")}</small>{tr(language, "Wednesday, 26 August 2026", "2026 年 8 月 26 日，星期三")}</span>
            <span><Clock3 aria-hidden="true" /><small>{tr(language, "Time", "时间")}</small>19:30–20:30 AEST</span>
            <span><Globe2 aria-hidden="true" /><small>{tr(language, "Format", "形式")}</small>{tr(language, "Online · Free", "线上 · 免费")}</span>
            <span><Presentation aria-hidden="true" /><small>{tr(language, "Guest", "嘉宾")}</small>{tr(language, "Michelle Yang · MAP founder · Canva TPM · ICF-certified coach · 15 years in tech", "Michelle Yang · MAP 创始人 · Canva 技术项目经理 · ICF 认证教练 · 15 年科技行业经验")}</span>
          </div>
          <a className="eventbrite-button community-upcoming-cta" href="https://www.eventbrite.com.au/e/map-connect-1-ai-wont-take-your-job-it-will-reprice-you-tickets-1996767815287?aff=oddtdtcreator" target="_blank" rel="noreferrer"><CalendarDays size={17} />{tr(language, "Register free on Eventbrite", "前往 Eventbrite 免费报名")}</a>
        </section>
        <section className="knowledge-agent-session" aria-labelledby="knowledge-agent-title">
          <div className="knowledge-agent-overview">
            <p>{tr(language, "AI Workshop", "AI 工作坊")}</p>
            <h3 id="knowledge-agent-title">{tr(language, "Build Your Knowledge Agent", "构建你的知识智能体")}</h3>
            <span>{tr(language, "A practical, hands-on session by Make AI Practical", "Make AI Practical 实用型动手工作坊")}</span>
            <p className="knowledge-agent-description">
              {tr(language, "Turn the information you already collect into a useful AI knowledge agent. Work through the process step by step, build a working example, and leave with an approach you can continue improving after the workshop.", "把你平时收集的信息转化为真正有用的 AI 知识智能体。跟随工作坊一步步完成构建，带走一个可运行的示例，以及课后可以继续完善的方法。")}
            </p>
            <p className="community-workshop-note">
              {tr(language, "Past sessions co-hosted by Yangyang and Eric", "往期活动由阳阳与 Eric 共同主持")}
            </p>
            <div className="event-facts knowledge-agent-runs">
              <span><CalendarDays /><small>{tr(language, "First run", "首场活动")}</small>{tr(language, "14 June 2026 · Melbourne", "2026 年 6 月 14 日 · 墨尔本")}</span>
              <span><MapPin /><small>{tr(language, "Second run", "第二场")}</small>{tr(language, "9 August 2026 · Melbourne", "2026 年 8 月 9 日 · 墨尔本")}</span>
            </div>
            <div className="knowledge-agent-highlights" aria-label={tr(language, "Workshop highlights", "工作坊亮点")}>
              <span><Wrench aria-hidden="true" />{tr(language, "Build as you learn", "边学边做")}</span>
              <span><Clock3 aria-hidden="true" />{tr(language, "Three-hour workshop", "三小时工作坊")}</span>
              <span><Network aria-hidden="true" />{tr(language, "Small community setting", "小型社区交流")}</span>
            </div>
          </div>
          <form className="workshop-interest-form" onSubmit={submitWorkshopInterest}>
            {workshopSubmitState === "success" ? (
              <div className="workshop-interest-success" role="status">
                <span><Mail aria-hidden="true" /></span>
                <h4>{tr(language, "Successfully Submitted", "提交成功")}</h4>
                <p>{tr(language, "Thank you. Your interest has been sent to MAP, and we’ll contact you about the next workshop.", "谢谢！您的参与意向已发送给 MAP，我们会就下一期工作坊与您联系。")}</p>
                <button type="button" onClick={() => setWorkshopSubmitState("idle")}>{tr(language, "Submit Another Email", "提交另一个邮箱")}</button>
              </div>
            ) : <>
              <div>
                <p>{tr(language, "Next Session", "下一期活动")}</p>
                <h4>{tr(language, "Register Your Interest", "登记参与意向")}</h4>
                <span>{tr(language, "Leave your email to hear about the next workshop.", "留下您的邮箱，以便接收下一期工作坊的消息。")}</span>
              </div>
              <label htmlFor="workshop-interest-email">{tr(language, "Email Address", "邮箱地址")}</label>
              <div className="workshop-interest-controls">
                <input id="workshop-interest-email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
                <button type="submit" disabled={workshopSubmitState === "submitting"}><Mail aria-hidden="true" />{workshopSubmitState === "submitting" ? tr(language, "Submitting…", "正在提交……") : tr(language, "I'm Interested", "我感兴趣")}</button>
              </div>
              {workshopSubmitState === "error" && <p className="workshop-interest-error" role="alert">{tr(language, "Something went wrong. Please try again.", "提交失败，请重试。")}</p>}
              <small>{tr(language, "Your interest will be sent directly to Yangyang Cai without leaving this page.", "您的参与意向会直接发送给蔡阳阳，无需离开此页面。")}</small>
            </>}
          </form>
        </section>
        <section className="book-club-session">
          <div className="book-club-photo">
            <ExpandableImage
              src={bookClubSessionOneImage}
              alt={tr(
                language,
                "Book Club Session 1 table with seven shared book recommendations",
                "读书会第一期现场与七本分享书目",
              )}
              width={1440}
              height={1080}
              sizes="(max-width: 760px) 100vw, 48vw"
              language={language}
            />
          </div>
          <div className="book-club-copy">
            <p>
              {tr(
                language,
                "Community Book Club · 28 February 2026",
                "社区读书会 · 2026 年 2 月 28 日",
              )}
            </p>
            <h3>
              {tr(
                language,
                "Session 1: Our shared bookshelf",
                "第一期：我们的共享书单",
              )}
            </h3>
            <small>
              {tr(
                language,
                "Seven books brought into one warm conversation.",
                "七本书，汇聚成一场温暖的交流。",
              )}
            </small>
            <ol>
              {[
                tr(
                  language,
                  "Cognitive Awakening: Unlocking the Inner Drive for Self-Change",
                  "《认知觉醒》",
                ),
                tr(language, "The Water of Canglang", "《沧浪之水》"),
                tr(language, "Earthbound", "《落在地球》"),
                tr(
                  language,
                  "Wu Zhihong's Psychology",
                  "《武志红的心理学》",
                ),
                tr(language, "The Alchemist", "《牧羊少年奇遇记》"),
                tr(
                  language,
                  "The 7 Habits of Highly Effective People",
                  "《高效人士的七个习惯》",
                ),
                tr(language, "The Order of Time", "《时间的秩序》"),
              ].map((book, index) => (
                <li key={book}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{book}</b>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="community-invite">
          <header>
            <span>
              <Network aria-hidden="true" />
            </span>
            <div>
              <p>{tr(language, "Industry Event Invitation", "行业活动邀请")}</p>
              <h3>Interconnected</h3>
              <small>
                {tr(
                  language,
                  "Monash Alumni Networking Lounge · Postgraduate Students",
                  "莫纳什校友交流空间 · 研究生专场",
                )}
              </small>
            </div>
          </header>
          <p className="community-invite-description">
            {tr(
              language,
              "A career-development and networking evening designed to connect postgraduate students with alumni and industry professionals through practical conversations, career insights, and new professional connections.",
              "一场面向研究生的职业发展与交流活动，通过务实对话、职业洞察和新的专业联系，与校友及行业人士建立连接。",
            )}
          </p>
          <div className="community-invite-details">
            <span>
              <CalendarDays aria-hidden="true" />
              <small>{tr(language, "Date", "日期")}</small>
              {tr(
                language,
                "Thursday, 3 September 2026",
                "2026 年 9 月 3 日，星期四",
              )}
            </span>
            <span>
              <Clock3 aria-hidden="true" />
              <small>{tr(language, "Arrival", "签到")}</small>
              {tr(
                language,
                "4:00–4:30 pm · refreshments provided",
                "下午 4:00–4:30 · 提供茶点",
              )}
            </span>
            <span>
              <Clock3 aria-hidden="true" />
              <small>{tr(language, "Event", "活动时间")}</small>
              {tr(language, "5:00–8:00 pm", "下午 5:00–8:00")}
            </span>
            <span>
              <MapPin aria-hidden="true" />
              <small>{tr(language, "Location", "地点")}</small>
              {tr(
                language,
                "Monash College, 750 Collins Street, Docklands VIC",
                "莫纳什学院，750 Collins Street, Docklands VIC",
              )}
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

function Books({ language }: { language: Language }) {
  return (
    <div className="window-page books-page">
      <header className="story-books-heading">
        <p className="page-pill">{tr(language, "BOOK STORIES", "书中故事")}</p>
        <h2>{tr(language, "Books I'm enjoying", "最近喜欢的书")}</h2>
        <p>
          {tr(
            language,
            "A few books I'm reading now and recently finished.",
            "一些正在读和最近读完的书。",
          )}
        </p>
      </header>
      <ScrollHint language={language} />
      <div
        className="book-list"
        role="region"
        tabIndex={0}
        aria-label={tr(language, "Scrollable book shelf", "可横向滚动的书架")}
      >
        <article className="book-entry">
          <Image
            src={mercyBookImage}
            alt={tr(
              language,
              "Relations of Grace book cover",
              "《仁慈的关系》封面",
            )}
            width={640}
            height={860}
          />
          <div className="book-entry-copy">
            <p className="page-pill">
              {tr(language, "Current focus", "正在阅读")}
            </p>
            <h3>{tr(language, "Relations of Grace", "仁慈的关系")}</h3>
            <p className="book-author">
              {tr(language, "László Krasznahorkai", "克拉斯诺霍尔卡伊·拉斯洛")}
            </p>
            <p className="book-published">
              <CalendarDays />
              {tr(
                language,
                "First published 1986 · Chinese edition 2020",
                "初版于 1986 年 · 中文版于 2020 年出版",
              )}
            </p>
            <p className="book-summary">
              {tr(
                language,
                "Eight stories about people searching for grace in uncertain times.",
                "八个关于人们在不确定中寻找仁慈的故事。",
              )}
            </p>
          </div>
        </article>
        <article className="book-entry">
          <Image
            src={nexusBookImage}
            alt={tr(language, "Nexus book cover", "《智人之上》封面")}
            width={640}
            height={860}
          />
          <div className="book-entry-copy">
            <p className="page-pill">
              {tr(language, "Current focus", "正在阅读")}
            </p>
            <h3>{tr(language, "Nexus", "智人之上")}</h3>
            <p className="book-author">Yuval Noah Harari</p>
            <p className="book-published">
              <CalendarDays />
              {tr(language, "Published in 2024", "出版于 2024 年")}
            </p>
            <p className="book-summary">
              {tr(
                language,
                "How information networks shape power, society, and truth.",
                "讲述信息网络如何塑造权力、社会与真相。",
              )}
            </p>
          </div>
        </article>
        <article className="book-entry">
          <Image
            src={alchemistBookImage}
            alt={tr(
              language,
              "The Alchemist book cover",
              "《牧羊少年奇幻之旅》封面",
            )}
            width={640}
            height={860}
          />
          <div className="book-entry-copy">
            <p className="page-pill">
              {tr(language, "Recently finished", "最近读完")}
            </p>
            <h3>{tr(language, "The Alchemist", "牧羊少年奇幻之旅")}</h3>
            <p className="book-author">Paulo Coelho</p>
            <p className="book-published">
              <CalendarDays />
              {tr(language, "First published in 1988", "初版于 1988 年")}
            </p>
            <p className="book-summary">
              {tr(
                language,
                "A shepherd's journey about dreams, courage, and finding your path.",
                "一个关于梦想、勇气与寻找自己道路的旅程。",
              )}
            </p>
          </div>
        </article>
        <article className="book-entry">
          <Image
            src={phoenixProjectBookImage}
            alt={tr(
              language,
              "The Phoenix Project book cover",
              "《凤凰项目》封面",
            )}
            width={640}
            height={860}
          />
          <div className="book-entry-copy">
            <p className="page-pill">
              {tr(language, "Recently finished", "最近读完")}
            </p>
            <h3>{tr(language, "The Phoenix Project", "凤凰项目")}</h3>
            <p className="book-author">
              Gene Kim, Kevin Behr &amp; George Spafford
            </p>
            <p className="book-published">
              <CalendarDays />
              {tr(language, "First published in 2013", "初版于 2013 年")}
            </p>
            <p className="book-summary">
              {tr(
                language,
                "A DevOps novel about improving flow, collaboration, and delivery in a struggling IT organisation.",
                "一部关于陷入困境的 IT 团队如何通过 DevOps 改善流程、协作与交付的商业小说。",
              )}
            </p>
          </div>
        </article>
        <article className="book-entry">
          <Image
            src={educatedBookImage}
            alt={tr(
              language,
              "Educated book cover",
              "《你当像鸟飞往你的山》封面",
            )}
            width={640}
            height={860}
          />
          <div className="book-entry-copy">
            <p className="page-pill">
              {tr(language, "Recently finished", "最近读完")}
            </p>
            <h3>{tr(language, "Educated", "你当像鸟飞往你的山")}</h3>
            <p className="book-author">Tara Westover</p>
            <p className="book-published">
              <CalendarDays />
              {tr(language, "Published in 2018", "出版于 2018 年")}
            </p>
            <p className="book-summary">
              {tr(
                language,
                "A memoir about education, self-invention, and finding a life beyond the world that shaped you.",
                "一部关于教育、自我重塑，以及走出原生世界寻找人生方向的回忆录。",
              )}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}

function Fun({ language }: { language: Language }) {
  return (
    <div className="window-page fun-page">
      <PageIntro
        eyebrow={tr(language, "My Happy Place", "我的快乐天地")}
        title={tr(language, "Just for Fun", "兴趣时光")}
        description={tr(
          language,
          "When I’m not architecting data pipelines, I’m usually at the potter’s wheel or exploring digital realms.",
          "不设计数据管道的时候，我通常在陶艺转盘前，或探索数字世界。",
        )}
      />
      <div className="fun-grid">
        <AnimationShelf language={language} />
        <section className="fun-books fun-window-frame">
          <h3 className="fun-window-bar">
            {tr(language, "reading.shelf", "阅读.书架")}
          </h3>
          <Books language={language} />
        </section>
        <section className="pottery-window fun-window-frame">
          <h3 className="fun-window-bar">
            {tr(language, "pottery.studio", "陶艺.工作室")}
          </h3>
          <div className="pottery-images">
            <Image
              src={potteryOneImage}
              alt={tr(
                language,
                "Handmade pottery in progress",
                "手工陶艺制作过程",
              )}
              width={400}
              height={280}
            />
            <Image
              src={potteryTwoImage}
              alt={tr(
                language,
                "Colourful glazed pottery",
                "色彩丰富的釉面陶艺",
              )}
              width={400}
              height={280}
            />
            <Image
              src={potteryThreeImage}
              alt={tr(
                language,
                "Freshly shaped ceramic spoons",
                "刚刚塑形完成的陶瓷勺",
              )}
              width={800}
              height={360}
            />
          </div>
        </section>
        <section className="games-window fun-window-frame">
          <h3 className="fun-window-bar">
            {tr(language, "gaming.log", "游戏.日志")}
          </h3>
          <div className="game-card game-card-link">
            <Image
              src={splitFictionImage}
              alt={tr(
                language,
                "Split Fiction game cover",
                "《双影奇境》游戏封面",
              )}
              width={60}
              height={60}
            />
            <span>
              <b>Split Fiction</b>
              <small>
                {tr(
                  language,
                  "Sci-fi meets fantasy co-op",
                  "科幻与奇幻交织的合作冒险",
                )}
              </small>
              <OnlineRating
                language={language}
                compact
                score="9.1/10"
                source="Metacritic"
                href="https://www.metacritic.com/game/split-fiction/"
              />
            </span>
            <a
              href="https://www.ea.com/en/games/split-fiction/split-fiction"
              target="_blank"
              rel="noreferrer"
              aria-label={tr(
                language,
                "Visit the official Split Fiction website",
                "访问《双影奇境》官方网站",
              )}
            >
              <ExternalLink size={15} />
            </a>
          </div>
          <GameCard
            image={itTakesTwoImage}
            title="It Takes Two"
            note={tr(language, "Co-op masterpiece", "合作游戏佳作")}
            score="8.8/10"
            ratingHref="https://www.metacritic.com/game/it-takes-two/"
            language={language}
          />
          <GameCard
            image={hogwartsLegacyImage}
            title="Hogwarts Legacy"
            note={tr(language, "Magical explorer", "魔法世界探索")}
            score="8.4/10"
            ratingHref="https://www.metacritic.com/game/hogwarts-legacy/"
            language={language}
          />
          <GameCard
            image={pokemonGoImage}
            title="Pokémon GO"
            note={tr(
              language,
              "Explore the world together",
              "一起探索现实世界",
            )}
            score="69/100"
            ratingHref="https://www.metacritic.com/game/pokemon-go/"
            language={language}
          />
        </section>
        <section className="conference-window fun-window-frame">
          <h3 className="fun-window-bar">
            {tr(language, "festival.calendar", "游戏节.日历")}
          </h3>
          <div className="conference-body">
            <div className="conference-mark">
              <PartyPopper />
            </div>
            <div className="conference-copy">
              <p className="page-pill">
                {tr(language, "Gaming festival", "游戏节")}
              </p>
              <h3>PAX Aus 2026</h3>
              <p>
                {tr(
                  language,
                  "Three days of games, live experiences, tournaments, panels, and community at Australia’s biggest celebration of gaming culture.",
                  "澳大利亚规模最大的游戏文化盛会，带来三天的游戏体验、赛事、论坛与社区活动。",
                )}
              </p>
              <div className="conference-meta">
                <span>
                  <CalendarDays />
                  {tr(
                    language,
                    "9 to 11 October 2026",
                    "2026 年 10 月 9 日至 11 日",
                  )}
                </span>
                <span>
                  <MapPin />
                  {tr(language, "MCEC, Melbourne", "墨尔本 MCEC")}
                </span>
              </div>
            </div>
            <a
              className="conference-cta"
              href="https://aus.paxsite.com/"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                {tr(language, "Official festival website", "游戏节官方网站")}
              </span>
              <strong>
                {tr(language, "Explore PAX Aus", "了解 PAX Aus")}
                <ExternalLink size={15} />
              </strong>
            </a>
          </div>
        </section>
        <section className="conference-window energy-conference fun-window-frame">
          <h3 className="fun-window-bar">
            {tr(language, "energy.calendar", "能源.日历")}
          </h3>
          <div className="conference-body">
            <div className="conference-mark">
              <Zap />
            </div>
            <div className="conference-copy">
              <p className="page-pill">
                {tr(language, "Energy conference", "能源行业会议")}
              </p>
              <h3>All-Energy Australia 2026</h3>
              <p>
                {tr(
                  language,
                  "Two days of ideas, technology, and conversations shaping Australia's clean-energy transition, from grids and storage to energy management and electric mobility.",
                  "聚焦澳大利亚清洁能源转型的两天行业盛会，涵盖电网、储能、能源管理与电动交通等技术、观点和交流。",
                )}
              </p>
              <div className="conference-meta">
                <span>
                  <CalendarDays />
                  {tr(
                    language,
                    "28 to 29 October 2026",
                    "2026 年 10 月 28 日至 29 日",
                  )}
                </span>
                <span>
                  <MapPin />
                  {tr(language, "MCEC, Melbourne", "墨尔本 MCEC")}
                </span>
              </div>
            </div>
            <a
              className="conference-cta"
              href="https://www.all-energy.com.au/"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                {tr(language, "Official event website", "活动官方网站")}
              </span>
              <strong>
                {tr(language, "Explore All-Energy", "了解 All-Energy")}
                <ExternalLink size={15} />
              </strong>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

function AnimationShelf({ language }: { language: Language }) {
  const shows = [
    {
      image: fanRenImage,
      title: "A Record of a Mortal Journey to Immortality",
      titleZh: "凡人修仙传",
    },
    {
      image: guangYinImage,
      title: "Beyond the Timescape",
      titleZh: "光阴之外",
    },
    { image: muShenImage, title: "Tales of Herding Gods", titleZh: "牧神记" },
    { image: xianNiImage, title: "Renegade Immortal", titleZh: "仙逆" },
    { image: jianLaiImage, title: "Sword of Coming", titleZh: "剑来" },
  ];
  return (
    <section className="animation-window fun-window-frame">
      <h3 className="fun-window-bar">
        {tr(language, "animation.watch", "动画.追看")}
      </h3>
      <div className="animation-window-body">
        <header>
          <span className="animation-mark">
            <Tv />
          </span>
          <div>
            <p className="page-pill">
              {tr(language, "Animation & donghua", "动画与国漫")}
            </p>
            <h3>
              {tr(
                language,
                "Stories I keep coming back to",
                "让我反复回味的动画世界",
              )}
            </h3>
            <p>
              {tr(
                language,
                "Cultivation worlds, unforgettable journeys, and characters worth cheering for.",
                "修仙世界、难忘旅程，以及值得一路陪伴的角色。",
              )}
            </p>
          </div>
        </header>
        <ScrollHint language={language} />
        <div
          className="animation-grid"
          role="region"
          tabIndex={0}
          aria-label={tr(
            language,
            "Scrollable animation shelf",
            "可横向滚动的动画列表",
          )}
        >
          {shows.map((show) => (
            <article key={show.titleZh}>
              <Image
                src={show.image}
                alt={`${language === "zh" ? show.titleZh : show.title} poster`}
                width={680}
                height={1000}
              />
              <div>
                <b>{language === "zh" ? show.titleZh : show.title}</b>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function GameCard({
  image,
  title,
  note,
  score,
  ratingHref,
  language,
}: {
  image: StaticImageData | string;
  title: string;
  note: string;
  score: string;
  ratingHref: string;
  language: Language;
}) {
  return (
    <div className="game-card">
      <Image
        src={image}
        alt={`${title} ${tr(language, "game cover", "游戏封面")}`}
        width={72}
        height={72}
      />
      <span>
        <b>{title}</b>
        <small>{note}</small>
        <OnlineRating
          language={language}
          compact
          score={score}
          source="Metacritic"
          href={ratingHref}
        />
      </span>
    </div>
  );
}

function OnlineRating({
  language,
  score,
  source,
  href,
  compact = false,
}: {
  language: Language;
  score: string;
  source: string;
  href: string;
  compact?: boolean;
}) {
  return (
    <a
      className={`online-rating ${compact ? "compact" : ""}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={tr(
        language,
        `${score} on ${source}`,
        `${score}，来源：${source}`,
      )}
    >
      <Star size={14} />
      <b>{score}</b>
      <span>{source}</span>
      <ExternalLink size={11} />
    </a>
  );
}

function friendLinks(language: Language) {
  return [
    {
      title: tr(language, "The Joke Shop", "The Joke Shop 喜剧现场"),
      kind: tr(language, "Live comedy", "现场喜剧"),
      description: tr(
        language,
        "A welcoming live showcase with brilliant comedians on an intimate stage.",
        "在亲密舞台上遇见精彩喜剧演员的轻松现场。",
      ),
      href: "https://events.humanitix.com/the-joke-shop",
      actionLabel: tr(language, "Book now", "立即订票"),
      aboutHref: "https://www.instagram.com/thejokeshopcomedy",
      aboutLabel: tr(language, "Follow us", "关注我们"),
      image: jokeShopImage,
    },
    {
      title: tr(language, "Hammer Philosophy", "锤子哲学"),
      kind: tr(language, "Friend's book", "朋友的书"),
      description: tr(
        language,
        "A thoughtful book about clearing away noise and slowly becoming yourself.",
        "一本关于敲掉噪音、慢慢成为自己的思考之书。",
      ),
      href: "https://www.trybooking.com/events/landing/1604518?qr=true",
      actionLabel: tr(language, "Buy now", "立即购买"),
      image: hammerPhilosophyImage,
    },
    {
      title: tr(language, "So What", "又怎样 SO WHAT"),
      kind: tr(language, "Podcast", "播客"),
      description: tr(
        language,
        "Warm, honest conversations about life in Australia and questions without standard answers.",
        "聊澳洲生活、成长，以及那些没有标准答案的问题。",
      ),
      href: "https://podcasts.apple.com/us/podcast/%E5%8F%88%E6%80%8E%E6%A0%B7-so-what/id1861253766",
      actionLabel: tr(language, "Listen now", "立即收听"),
      image: soWhatPodcastImage,
    },
    {
      title: tr(language, "Chat & Chill", "人间随便聊，Chat & Chill"),
      kind: tr(language, "Podcast", "播客"),
      description: tr(
        language,
        "Two Chinese women living in Australia talk about life, growth, and the real questions that don't have easy answers.",
        "两个在澳洲生活的中国女性，聊生活、成长，也聊那些没有标准答案却值得被听见的真实困惑。",
      ),
      href: "https://www.xiaoyuzhoufm.com/podcast/6828413e137a629097a0bf0f",
      actionLabel: tr(language, "Listen now", "立即收听"),
      aboutHref: "https://yaojin-homepage.vercel.app/#home",
      image: chatAndChillImage,
    },
    {
      title: tr(language, "Grow with Rui", "曲大方妈妈 · ICF教练"),
      kind: tr(language, "ICF coach", "ICF 教练"),
      description: tr(
        language,
        "From Xi'an to Melbourne, a coach-mom reimagining growth through curiosity.",
        "一个在墨尔本重新养育自己的ICF教练，陪你用提问找到答案。",
      ),
      href: "https://grow-with-rui.lovable.app",
      actionLabel: tr(language, "Visit website", "访问网站"),
      image: growWithRuiImage,
    },
    {
      title: "CamMicTest",
      kind: tr(language, "Browser tool", "浏览器工具"),
      description: tr(
        language,
        "A quick, private way to test your camera and microphone directly in your browser.",
        "直接在浏览器中快速、私密地测试摄像头与麦克风。",
      ),
      href: "https://cammictest.com/",
      actionLabel: tr(language, "Test your setup", "测试设备"),
      icon: Camera,
    },
    {
      title: tr(
        language,
        "A Woman with Love and Courage",
        "一位充满爱与勇气的女性",
      ),
      kind: tr(language, "Personal blog", "个人博客"),
      description: tr(
        language,
        "Luna Wen's reflections on life, growth, love, and finding the courage to move forward.",
        "Luna Wen 关于生活、成长与爱的思考，也记录着勇敢前行的力量。",
      ),
      href: "https://blog.lunawen.com/",
      actionLabel: tr(language, "Read the blog", "阅读博客"),
      image: lunaWenBlogImage,
    },
    {
      title: "Arina",
      kind: tr(
        language,
        "Frontend Engineer & Independent Builder",
        "前端工程师与独立开发者",
      ),
      description: tr(
        language,
        "A Melbourne-based frontend engineer and independent builder turning ideas into thoughtful products across web, mobile, and AI.",
        "一位常驻墨尔本、专注前端的软件工程师与独立开发者，将创意转化为用心打造的 Web、移动端与 AI 产品。",
      ),
      href: "https://arina-dev.com/",
      actionLabel: tr(language, "Visit website", "访问网站"),
      image: arinaDevImage,
    },
  ];
}

function Links({ language }: { language: Language }) {
  const loved = [
    {
      title: "Mutoo",
      label: tr(language, "Creative home", "创意主页"),
      description: tr(
        language,
        "A thoughtful space for ideas, writing, and creative exploration.",
        "一个分享想法、文字与创意探索的空间。",
      ),
      href: "https://mutoo.im/",
      icon: Sparkles,
    },
    {
      title: "Sixdoku",
      label: tr(language, "Playdate game", "Playdate 游戏"),
      description: tr(
        language,
        "A compact logic puzzle created for the Playdate console.",
        "一款为 Playdate 掌机打造的精巧逻辑解谜游戏。",
      ),
      href: "https://mutoo.itch.io/sixdoku",
      icon: Gamepad2,
    },
    {
      title: "Critterpedia Plus",
      label: tr(language, "Companion app", "游戏助手"),
      description: tr(
        language,
        "A handy companion for discovering critters and finding what is still missing.",
        "一个帮助发现生物并找出收藏中缺失内容的实用助手。",
      ),
      href: "https://critterpedia-plus.mutoo.im/#/discovery/insects",
      icon: Bug,
    },
  ];
  const links = [
    {
      title: "Omdena",
      category: tr(language, "Collaborative AI", "协作式 AI"),
      description: tr(
        language,
        "A global community building real-world AI solutions through collaborative challenges.",
        "一个通过协作式挑战构建真实世界 AI 解决方案的全球社区。",
      ),
      href: "https://www.omdena.com/",
      icon: Network,
      tone: "blue",
    },
    {
      title: "Make AI Practical",
      category: tr(language, "AI community", "AI 社区"),
      description: tr(
        language,
        "Real AI, real life, real connection. Practical learning and community around useful AI.",
        "真实 AI，真实生活，真实连接。围绕实用 AI 的学习与社区。",
      ),
      href: "https://www.makeaipractical.com.au/",
      icon: Globe2,
      tone: "green",
    },
    {
      title: "Home Essentials",
      category: tr(language, "Business project", "商业项目"),
      description: tr(
        language,
        "An Australian online store for thoughtful gifts, home decor, craft supplies, and everyday essentials.",
        "一家澳大利亚在线商店，提供用心挑选的礼品、家居装饰、手工用品和日常好物。",
      ),
      href: "https://home-essentials.com.au/",
      icon: Store,
      tone: "peach",
    },
    {
      title: tr(language, "Knowledge Agent Workshop", "知识智能体工作坊"),
      category: tr(language, "Hands-on workshop", "实践工作坊"),
      description: tr(
        language,
        "Build a personal Knowledge Agent in a practical three-hour workshop.",
        "在三小时的实践工作坊中，构建属于自己的知识智能体。",
      ),
      href: "https://www.eventbrite.com.au/e/stop-taking-notes-only-build-a-personal-knowledge-agent-in-3-hours-tickets-1993965180531?aff=erelpanelorg",
      icon: Presentation,
      tone: "gold",
    },
  ];
  return (
    <div className="window-page links-page">
      <PageIntro
        eyebrow={tr(language, "People and places I value", "我珍视的人与空间")}
        title={tr(language, "Friends & Links", "朋友与链接")}
        description={tr(
          language,
          "Creative work from people I care about, followed by a compact shelf of places connected to my own work.",
          "先分享我珍视的人们带来的创作，再用一个紧凑的链接架呈现与我相关的项目和社区。",
        )}
      />
      <section className="loved-links">
        <header>
          <div>
            <p className="loved-label">
              <Heart aria-hidden="true" fill="currentColor" />{" "}
              {tr(language, "Loved", "珍爱")}
            </p>
            <h3>Mutoo</h3>
          </div>
          <p>
            {tr(
              language,
              "A collection of thoughtful games, useful tools, and digital projects created by Mutoo.",
              "这里收集了 Mutoo 创作的精彩游戏、实用工具与数字项目。",
            )}
          </p>
        </header>
        <div
          className="loved-links-grid"
          role="region"
          tabIndex={0}
          aria-label={tr(
            language,
            "Scrollable loved links",
            "可横向滚动的珍爱链接",
          )}
        >
          {loved.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.href}>
                <span className="loved-icon">
                  <Icon aria-hidden="true" />
                </span>
                <p>{item.label}</p>
                <h4>{item.title}</h4>
                <small>{item.description}</small>
                <a href={item.href} target="_blank" rel="noreferrer">
                  <span>{tr(language, "Explore", "去看看")}</span>
                  <ExternalLink size={15} />
                </a>
              </article>
            );
          })}
        </div>
      </section>
      <section className="friends-links fun-window-frame">
        <h3 className="fun-window-bar">
          {tr(language, "friends.share", "朋友.分享")}
        </h3>
        <div className="friends-links-body">
          <header>
            <p className="page-pill">{tr(language, "Friends", "朋友")}</p>
            <h3>{tr(language, "Made by friends", "朋友们的创作")}</h3>
            <p>
              {tr(
                language,
                "Books, podcasts, coaching, and live comedy worth discovering.",
                "值得发现的书籍、播客、教练服务与现场喜剧。",
              )}
            </p>
          </header>
          <div
            className="friends-links-grid"
            role="region"
            tabIndex={0}
            aria-label={tr(
              language,
              "Scrollable friends links",
              "可横向滚动的朋友链接",
            )}
          >
            {friendLinks(language).map((item) => (
              <article key={item.href}>
                {"image" in item && item.image ? (
                  <ExpandableImage
                    src={item.image}
                    alt={`${item.title} ${tr(language, "cover", "封面")}`}
                    width={720}
                    height={720}
                    language={language}
                    className="friend-cover-expand"
                  />
                ) : (
                  <div className="friend-tool-cover" aria-hidden="true">
                    <item.icon />
                    <span>CAM + MIC</span>
                  </div>
                )}
                <div>
                  <p>{item.kind}</p>
                  <h4>{item.title}</h4>
                  <small>{item.description}</small>
                  <div className="friend-card-actions">
                    <a href={item.href} target="_blank" rel="noreferrer">
                      <span>
                        {"actionLabel" in item
                          ? item.actionLabel
                          : tr(language, "Listen or visit", "收听或访问")}
                      </span>
                      <ExternalLink size={14} />
                    </a>
                    {"aboutHref" in item && item.aboutHref && (
                      <a href={item.aboutHref} target="_blank" rel="noreferrer">
                        <span>
                          {"aboutLabel" in item
                            ? item.aboutLabel
                            : tr(language, "More about us", "了解更多")}
                        </span>
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="personal-links fun-window-frame">
        <h3 className="fun-window-bar">
          {tr(language, "yangyang.links", "阳阳.链接")}
        </h3>
        <div className="personal-links-body">
          <header className="my-links-heading">
            <p className="page-pill">{tr(language, "My links", "我的链接")}</p>
            <h3>{tr(language, "Around my work", "与我的工作相关")}</h3>
            <p>
              {tr(
                language,
                "A compact shelf of communities and projects connected to my work.",
                "一个紧凑的链接架，收集与我工作相关的社区和项目。",
              )}
            </p>
          </header>
          <div
            className="links-grid"
            role="region"
            tabIndex={0}
            aria-label={tr(
              language,
              "Scrollable personal links",
              "可横向滚动的个人链接",
            )}
          >
            {links.map((link, index) => {
              const Icon = link.icon;
              return (
                <article className={`link-card ${link.tone}`} key={link.href}>
                  <div className="link-card-top">
                    <span className="link-card-icon">
                      <Icon aria-hidden="true" />
                    </span>
                    <span className="link-card-number">0{index + 1}</span>
                  </div>
                  <p className="link-category">{link.category}</p>
                  <h3>{link.title}</h3>
                  <p className="link-description">{link.description}</p>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${tr(language, "Visit", "访问")} ${link.title}`}
                  >
                    <span>{tr(language, "Explore", "去看看")}</span>
                    <ExternalLink size={16} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
function GitHubMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.39.97.1-.75.4-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.96 10.96 0 0 1 5.75 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.71 5.38-5.29 5.67.42.36.79 1.06.79 2.14v3.05c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}
function Contact({ language }: { language: Language }) {
  return (
    <div className="window-page contact-page">
      <PageIntro
        eyebrow={tr(language, "Stay connected", "保持联系")}
        title={tr(language, "Connect with me.", "和我保持联系。")}
        description={tr(
          language,
          "Find me where I share professional updates, community work, and things I am building.",
          "你可以在这里看到我的职业动态、社区活动和正在构建的项目。",
        )}
      />
      <div className="contact-grid">
        <article>
          <LinkedInMark />
          <h3>LinkedIn</h3>
          <p>
            {tr(
              language,
              "Professional journey, community work, and engineering updates.",
              "职业经历、社区工作和工程动态。",
            )}
          </p>
          <a
            href="https://www.linkedin.com/in/yangyangcai"
            target="_blank"
            rel="noreferrer"
          >
            {tr(language, "Visit profile", "访问主页")}{" "}
            <ExternalLink size={15} />
          </a>
        </article>
        <article>
          <GitHubMark />
          <h3>GitHub</h3>
          <p>
            {tr(
              language,
              "Projects, experiments, and code from my data and AI journey.",
              "记录我的数据与 AI 项目、实验和代码。",
            )}
          </p>
          <a href="https://github.com/DANancy" target="_blank" rel="noreferrer">
            {tr(language, "View GitHub", "查看 GitHub")}{" "}
            <ExternalLink size={15} />
          </a>
        </article>
        <article>
          <Mail />
          <h3>{tr(language, "Email", "电子邮箱")}</h3>
          <p>
            {tr(
              language,
              "For thoughtful conversations, collaborations, and opportunities.",
              "欢迎通过邮件交流想法、合作与机会。",
            )}
          </p>
          <a href="mailto:yangyangcai.au@gmail.com">
            {tr(language, "Send an email", "发送邮件")}{" "}
            <ExternalLink size={15} />
          </a>
        </article>
      </div>
    </div>
  );
}

function windowTitle(section: DesktopSection) {
  return {
    overview: "sunshine.exe",
    about: "about_me.md",
    work: "data_lover.zip",
    community: "community.makeaipractical.com",
    fun: "just_for_fun.app",
    links: "links.url",
    contact: "connect.exe",
  }[section];
}
