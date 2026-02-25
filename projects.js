/**
 * Use this file to manage all of your projects on the showcase site.
 * To add a new project, simply copy one of the existing objects `{}` and fill in your details.
 * The site will automatically build the beautiful glass cards for you.
 */

const projectData = [
    {
        id: "ai-dash",
        title: "AI Agent Dashboard",
        description: "A comprehensive dashboard for managing and monitoring autonomous AI agents in real-time, featuring websocket metrics and interactive task assignment.",
        image: "assets/project1.jpg",
        tags: ["React", "Node.js", "OpenAI"],
        demoLink: "#", // Replace '#' with your actual live demo URL
        sourceLink: "#", // Replace '#' with your GitHub repository URL
        delayClass: "" // no delay for the first card
    },
    {
        id: "fintech-mvp",
        title: "FinTech Analytics MVP",
        description: "A high-performance SaaS platform for financial data visualization, bringing real-time data streaming to retail investors.",
        image: "assets/project2.jpg",
        tags: ["Next.js", "Tailwind", "Prisma"],
        demoLink: "#",
        sourceLink: "#",
        delayClass: "delay-1"
    },
    {
        id: "3d-explorer",
        title: "3D Product Explorer",
        description: "An interactive, cinematic product configuration experience built natively for the web, allowing deep customization at 60fps.",
        image: "assets/project3.jpg",
        tags: ["Three.js", "WebGL", "GSAP"],
        demoLink: "#",
        sourceLink: "#",
        delayClass: "delay-2"
    }
];
