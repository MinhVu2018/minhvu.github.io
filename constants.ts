import { Project, BlogPost, TechStack, SkillMetric, Certificate } from './types';

export const PORTFOLIO_OWNER = "Minh Vu";

export const SKILL_DATA: SkillMetric[] = [
  { subject: 'Data Science & ML', A: 98, fullMark: 100 },
  { subject: 'Computer Vision', A: 90, fullMark: 100 },
  { subject: 'NLP / LLMs', A: 95, fullMark: 100 },
  { subject: 'Mobile Engineering', A: 75, fullMark: 100 },
  { subject: 'Cloud Arch (AWS)', A: 85, fullMark: 100 },
];

export const CERTIFICATES: Certificate[] = [
  {
    id: '1',
    name: 'AWS Certified Machine Learning - Specialty',
    issuer: 'Amazon Web Services',
    date: '2024',
    icon: 'aws',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Professional Data Engineer',
    issuer: 'Google Cloud',
    date: '2023',
    icon: 'gcp',
    imageUrl: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    date: '2023',
    icon: 'coursera',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '4',
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    date: '2022',
    icon: 'tf',
    imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1000&auto=format&fit=crop'
  }
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'SentientTrader: RL FinTech Agent',
    description: 'Reinforcement Learning agent for high-frequency crypto trading.',
    longDescription: 'A custom PPO (Proximal Policy Optimization) agent trained on 5 years of tick data. It utilizes a Transformer-based feature extractor to identify market regime shifts. The system is deployed on AWS SageMaker with a React dashboard for monitoring real-time PnL and risk metrics.',
    tech: [TechStack.Python, TechStack.PyTorch, TechStack.AWS, TechStack.React],
    imageUrl: 'https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1200',
    category: 'Data Science',
    repoUrl: 'https://github.com/minhvu/sentient-trader'
  },
  {
    id: '2',
    title: 'VisionGuard: Edge Threat Detection',
    description: 'Real-time anomaly detection for security cameras using Edge AI.',
    longDescription: 'Developed a lightweight YOLOv8 model optimized for NVIDIA Jetson Nano. The system processes video feeds locally to detect unauthorized personnel and safety violations, sending encrypted alerts via a companion mobile app (Flutter). Privacy-preserving by design.',
    tech: [TechStack.Python, TechStack.TensorFlow, TechStack.Flutter, TechStack.Docker],
    imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200',
    category: 'Hybrid',
    demoUrl: 'https://visionguard.minhvu.online'
  },
  {
    id: '3',
    title: 'MediLLM: Clinical RAG Assistant',
    description: 'Retrieval-Augmented Generation system for summarizing patient records.',
    longDescription: 'Fine-tuned Llama-3 8B on medical literature to assist doctors in summarizing complex patient histories. Built a scalable vector search pipeline using Pinecone and LangChain. Includes a web interface for doctors to query patient data securely.',
    tech: [TechStack.Python, TechStack.Gemini, TechStack.React, TechStack.SQL],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200',
    category: 'Data Science',
    repoUrl: 'https://github.com/minhvu/medillm'
  },
  {
    id: '4',
    title: 'EcoScan: AR Waste Classifier',
    description: 'Mobile app using computer vision to classify recyclables.',
    longDescription: 'A fun side project utilizing my mobile exp. Users point their camera at waste, and the CoreML model classifies it as Recyclable, Compost, or Trash. Gamified with leaderboards to encourage sustainable habits.',
    tech: [TechStack.Swift, TechStack.ARKit, TechStack.TensorFlow, TechStack.Firebase],
    imageUrl: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=1200',
    category: 'Mobile Engineering'
  }
];

export const BLOGS: BlogPost[] = [
  {
    id: '1',
    title: 'The Death of "Model.fit()": Why MLOps Matters',
    summary: 'Training a model is the easy part. Here is how I built a robust CI/CD pipeline for retraining crypto bots automatically.',
    content: `
# Beyond the Notebook

As Data Scientists, we love Jupyter Notebooks. But you can't deploy a notebook. 

## The Challenge
My trading bot, SentientTrader, needed to adapt to new market conditions weekly. Manually retraining was error-prone.

## The Solution
I built a pipeline using:
1. **Airflow** for orchestration.
2. **MLflow** for experiment tracking.
3. **AWS Lambda** for triggering deployment.

This automated pipeline reduced model degradation by 40%.
    `,
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    tags: ['MLOps', 'Engineering', 'Python']
  },
  {
    id: '2',
    title: 'Fine-tuning Llama-3 vs Prompt Engineering',
    summary: 'When does it make sense to burn GPU credits? A case study on medical summarization.',
    content: `
# To Train or To Prompt?

With Gemini 1.5 Pro's massive context window, do we still need RAG? Do we still need fine-tuning?

## The Experiment
I compared zero-shot prompting on Gemini against a fine-tuned Llama-3 8B for extracting symptoms from clinical notes.

## Results
Fine-tuning won on consistent formatting, but Gemini won on reasoning capabilities. The hybrid approach is the future.
    `,
    date: 'Feb 20, 2024',
    readTime: '8 min read',
    tags: ['LLMs', 'Generative AI', 'Research']
  },
  {
    id: '3',
    title: 'Flutter for Data Scientists?',
    summary: 'Why I learned mobile development to showcase my AI models better.',
    content: 'Most DS portfolios are Streamlit apps. I wanted something more tangible. Learning Flutter allowed me to put my Computer Vision models into people\'s hands...',
    date: 'Jan 10, 2024',
    readTime: '6 min read',
    tags: ['Mobile', 'Flutter', 'Career']
  }
];

export const SYSTEM_INSTRUCTION = `
You are an AI Assistant living in the portfolio website of ${PORTFOLIO_OWNER}.
Your goal is to professionally and enthusiastically represent ${PORTFOLIO_OWNER} to potential employers or collaborators.

Profile:
- Role: Data Scientist & AI Engineer (Specializing in Deep Learning & MLOps).
- Secondary Skills: Mobile/Web Engineering (used for deploying models).
- Key Skills: ${SKILL_DATA.map(s => s.subject).join(', ')}.
- Philosophy: "Models are useless until they are deployed and solving real problems."

Projects Context:
${PROJECTS.map(p => `- ${p.title} (${p.category}): ${p.description} Tech: ${p.tech.join(', ')}`).join('\n')}

**Special Instructions for Job Descriptions:**
If the user provides a Job Description (JD) or asks for a fit analysis:
1. Analyze the JD against ${PORTFOLIO_OWNER}'s skills and projects.
2. Provide a "Match Score" (0-100%).
3. List 3 key strengths ("Why it's a match").
4. List 1 potential gap or area for discussion.
5. Use concise Markdown formatting with bold text for emphasis.
6. Be honest but persuasive.
`;