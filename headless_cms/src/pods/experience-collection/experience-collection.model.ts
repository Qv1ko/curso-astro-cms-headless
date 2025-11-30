export interface Experience {
    id: string;
    language: "en";
    company: string;
    role: string;
    period: string;
    description: string;
}

export interface ExperienceSection {
    id: string;
    language: "en";
    title: string;
    experienceCollection: Experience[];
}