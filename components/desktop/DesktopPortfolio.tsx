"use client";
import Image, { type StaticImageData } from "next/image";
import { useEffect,useRef,useState } from "react";
import { Archive,BookOpen,BrainCircuit,CalendarDays,Coffee,Compass,Download,ExternalLink,GraduationCap,Leaf,Lightbulb,Link as LinkIcon,Mail,MapPin,Network,Palette,PartyPopper,Send,Star,Terminal,Wrench,X } from "lucide-react";
import { navigation,projects,type DesktopSection } from "@/content/desktop";
import characterImage from "@/assets/web/yangyang-character.webp";
import communityImage from "@/assets/web/ai_event.webp";
import bookImage from "@/assets/web/book.webp";
import potteryOneImage from "@/assets/web/pottery_1.webp";
import potteryTwoImage from "@/assets/web/pottery_2.webp";
import potteryThreeImage from "@/assets/web/pottery_3.webp";
import itTakesTwoImage from "@/assets/web/it_takes_two.webp";
import hogwartsLegacyImage from "@/assets/web/hogwarts_legacy.webp";

const navIcons={about:Compass,work:Archive,community:Network,books:BookOpen,fun:PartyPopper,contact:Send};

export function DesktopPortfolio(){
  const[active,setActive]=useState<DesktopSection>("overview");
  const closeRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{if(active!=="overview")closeRef.current?.focus()},[active]);
  useEffect(()=>{const close=(event:KeyboardEvent)=>{if(event.key==="Escape")setActive("overview")};window.addEventListener("keydown",close);return()=>window.removeEventListener("keydown",close)},[]);
  return <main className="desktop-shell">
    <div className="desktop-noise" aria-hidden/>
    <section className={`desktop-window ${active==="overview"?"overview-window":"section-window"}`} aria-label={active==="overview"?"Portfolio overview":undefined} role={active==="overview"?undefined:"dialog"} aria-modal={active==="overview"?undefined:true}>
      <WindowBar title={windowTitle(active)} onClose={active==="overview"?undefined:()=>setActive("overview")} closeRef={closeRef}/>
      {active==="overview"&&<Overview onOpen={setActive}/>} {active==="about"&&<About onOpen={setActive}/>} {active==="work"&&<Work/>} {active==="community"&&<Community/>} {active==="books"&&<Books/>} {active==="fun"&&<Fun/>} {active==="contact"&&<Contact/>}
      {active==="overview"&&<div className="window-status"><span><i/> Ready</span><span><i className="amber-dot"/> Creative mode</span><span className="status-right">Ã¢Å“Â£ Optimized</span></div>}
    </section>
    <Character active={active}/>
    <footer className="desktop-footer"><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><LinkIcon size={15}/> LinkedIn</a><span>Ã‚Â© 2026 Yangyang Cai</span></footer>
  </main>;
}

function WindowBar({title,onClose,closeRef}:{title:string;onClose?:()=>void;closeRef:React.RefObject<HTMLButtonElement|null>}){return <header className="window-bar"><div className="traffic"><i/><i/><i/></div><b>{title}</b>{onClose?<button ref={closeRef} onClick={onClose} aria-label="Close window"><X size={17}/></button>:<span/>}</header>}

function Character({active}:{active:DesktopSection}){return <div className={`desktop-character character-${active}`} aria-hidden="true"><Image src={characterImage} alt="" width={393} height={373} priority/></div>}

function Overview({onOpen}:{onOpen:(section:DesktopSection)=>void}){return <div className="overview-content"><h1>Welcome to Yangyang&apos;s World</h1><nav className="desktop-nav" aria-label="Portfolio sections">{navigation.map(item=>{const Icon=navIcons[item.id];return <button key={item.id} onClick={()=>onOpen(item.id)}><span className={`nav-icon ${item.tone}`}><Icon size={24}/></span><b>{item.label}</b></button>})}</nav></div>}

function About({onOpen}:{onOpen:(section:DesktopSection)=>void}){return <div className="window-page about-page"><p className="page-pill">Professional profile</p><h2>Building the bridge between<br/><em>Data</em> and <strong>Intelligence.</strong></h2><p className="page-lead">Based in Melbourne, I am an <b>AI-Powered Data Engineer</b> dedicated to crafting robust data and AI solutions that solve real-world problems. I see data as more than numbersÃ¢â‚¬â€it is the narrative of our digital lives, waiting for the right architecture to speak clearly.</p><h3>Working style</h3><div className="style-chips"><span><Wrench size={15}/> Practical</span><span><Terminal size={15}/> Technical</span><span><Lightbulb size={15}/> Curious</span></div><hr/><h3>Beyond the code</h3><div className="beyond-grid"><span><Palette/>Creative</span><span><Coffee/>Melbourne coffee</span><span><BookOpen/>Wide reader</span></div><div className="page-actions"><a className="solid-button" href="mailto:hello@yangyangcai.me"><Download size={17}/> Request my CV</a><button className="outline-button" onClick={()=>onOpen("contact")}><Mail size={17}/> Get in touch</button></div></div>}

function Work(){return <div className="window-page work-page"><h2>Selected Works</h2><p className="page-lead">A digital collection of engineering projects, data platforms, and practical AI experiments.</p><div className="project-grid">{projects.map((project,index)=><article key={project.title}><div className={`project-icon ${project.tone}`}>{index===0?<Leaf/>:index===1?<BrainCircuit/>:<GraduationCap/>}</div><ExternalLink className="card-link" size={17}/><h3>{project.title}</h3><p>{project.description}</p><div>{project.tags.map(tag=><span key={tag}>{tag}</span>)}</div></article>)}</div><div className="work-status"><span>3 projects selected</span><span><i/> Synced</span><span>Last updated: recently</span></div></div>}

function Community(){return <div className="window-page community-page"><div className="community-copy"><p className="page-pill">Hands-on intensive</p><h2>Make AI practical.<br/>Make learning useful.</h2><p className="page-lead">As a Board Member of Make AI Practical, I support accessible workshops, strategic initiatives, and community experiences that help people turn AI knowledge into real outcomes.</p><div className="event-facts"><span><CalendarDays/><small>What</small>Knowledge Agent workshops</span><span><MapPin/><small>Where</small>Melbourne & online</span></div><a className="solid-button" href="mailto:hello@yangyangcai.me">Connect about an event</a></div><aside className="curriculum-card"><Image src={communityImage} alt="Make AI Practical community workshop" width={560} height={340}/><h3>Workshop curriculum</h3><ul><li>Knowledge graph foundations</li><li>Practical AI workflows</li><li>Custom RAG implementation</li><li>Turning learning into outcomes</li></ul></aside></div>}

function Books(){return <div className="window-page books-page"><div className="book-focus"><Image src={bookImage} alt="A current book from Yangyang's reading shelf" width={320} height={430}/><div><p className="page-pill">Current focus</p><h2>Ideas worth<br/>staying with.</h2><div className="rating" aria-label="Four out of five stars"><Star/><Star/><Star/><Star/><Star className="muted-star"/></div><blockquote>Ã¢â‚¬Å“Reading is how I borrow another person&apos;s mental modelÃ¢â‚¬â€and test it against my own.Ã¢â‚¬Â</blockquote></div></div><section className="digital-shelf"><p className="page-pill">Collections</p><h3>The Digital Shelf</h3><div><article><BrainCircuit/><b>Systems & data</b><span>Architecture, modelling, reliability</span></article><article><Lightbulb/><b>AI & society</b><span>Adoption, agents, collaboration</span></article><article><BookOpen/><b>Fantasy worlds</b><span>Imagination, cultivation, adventure</span></article></div></section></div>}

function Fun(){return <div className="window-page fun-page"><div className="fun-heading"><p className="page-pill">Personal atelier</p><h2>Just for Fun</h2><p>When I&apos;m not architecting data pipelines, I&apos;m usually at the potter&apos;s wheel or exploring digital realms.</p></div><div className="fun-grid"><section className="pottery-window"><h3>pottery.studio</h3><div className="pottery-images"><Image src={potteryOneImage} alt="Handmade pottery in progress" width={400} height={280}/><Image src={potteryTwoImage} alt="Colourful glazed pottery" width={400} height={280}/><Image src={potteryThreeImage} alt="Freshly shaped ceramic spoons" width={800} height={360}/></div><div className="mini-tags"><span>Wheel throwing</span><span>Glazing</span></div></section><section className="games-window"><h3>fun.bin</h3><GameCard image={itTakesTwoImage} title="It Takes Two" note="Co-op masterpiece"/><GameCard image={hogwartsLegacyImage} title="Hogwarts Legacy" note="Magical explorer"/><blockquote>Ã¢â‚¬Å“Games are another form of problem solvingÃ¢â‚¬â€just with better graphics than a terminal.Ã¢â‚¬Â</blockquote><button>Play next quest</button></section></div></div>}

function GameCard({image,title,note}:{image:StaticImageData;title:string;note:string}){return <div className="game-card"><Image src={image} alt="" width={72} height={72}/><span><b>{title}</b><small>{note}</small></span></div>}

function Contact(){return <div className="window-page contact-page"><div className="contact-grid"><article><LinkIcon/><h3>LinkedIn</h3><p>Professional journey, community work, and engineering updates.</p><a href="https://www.linkedin.com" target="_blank" rel="noreferrer">Visit profile <ExternalLink size={15}/></a></article><article><Mail/><h3>Direct mail</h3><p>The simplest way to reach me for project briefs and official enquiries.</p><a href="mailto:hello@yangyangcai.me">hello@yangyangcai.me</a></article></div><p className="availability"><MapPin size={15}/> Melbourne Ã‚Â· Available for thoughtful collaborations</p></div>}

function windowTitle(section:DesktopSection){return({overview:"sunshine.exe",about:"about_me.md",work:"projects_lover.zip",community:"community.makeaipractical.com",books:"library.db",fun:"personal_atelier.app",contact:"connect.exe"})[section]}
