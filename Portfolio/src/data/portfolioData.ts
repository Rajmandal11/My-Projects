import { Project, Achievement, ExperienceItem, Testimonial, BlogArticle, PressArticle, Pillar } from '../types';
import imgObjectDetection from '../assets/images/project_automotive_hmi_1785736223904.jpg';
import imgPlantDisease from '../assets/images/project_plant_disease.jpg';
import imgChurnDashboard from '../assets/images/project_fintech_ui_1785736194511.jpg';
import imgNeuralWeave from '../assets/images/hero_3d_emerald_1785736179872.jpg';
import imgFaceRecognition from '../assets/images/project_face_recognition.jpg';
import imgSentimentNlp from '../assets/images/project_sentiment_nlp.jpg';

export const PERSONAL_INFO = {
  name: 'RAJ MANDAL',
  role: 'AI & Machine Learning Engineer',
  roles: [
    'AI & ML Engineer',
    'Deep Learning Researcher',
    'Data Scientist',
    'NLP Specialist',
    'Computer Vision Engineer',
    'MLOps Architect'
  ],
  location: 'MMDU, Mullana, Ambala, Haryana',
  email: 'rajmandal1081@gmail.com',
  github: 'https://github.com/Rajmandal11',
  linkedin: 'https://www.linkedin.com/in/raj-mandal-9a38b7331',
  bio: 'Building intelligent systems at the intersection of data, algorithms, and real-world impact. Specializing in deep learning, NLP, computer vision, and high-performance MLOps architectures.',
  stats: [
    { label: 'ML Projects', value: '12+' },
    { label: 'Certificates', value: '9' },
    { label: 'Best Accuracy', value: '94%' },
    { label: 'Kaggle Rank', value: 'Top 20%' }
  ],
  githubStats: {
    repositories: 12,
    stars: 28,
    commits: 47,
    pullRequests: 8,
    languages: [
      { name: 'Python', pct: 62, color: '#3572A5' },
      { name: 'Jupyter Notebook', pct: 21, color: '#DA5B0B' },
      { name: 'JavaScript', pct: 9, color: '#f1e05a' },
      { name: 'NEXT.js', pct: 5, color: '#b07219' },
      { name: 'Other', pct: 3, color: '#10b981' }
    ]
  }
};

export const PROJECTS: Project[] = [
  {
    id: 'object-detection-engine',
    title: 'Object Detection Engine',
    subtitle: 'End-to-End BERT Transformer NLP Pipeline',
    category: 'NLP',
    tagline: 'Fine-tuned BERT model for sentiment classification on a 50k review dataset with low-latency FastAPI deployment.',
    year: '2026',
    client: 'Open Source / NLP Benchmark',
    role: 'AI / NLP Lead Engineer',
    emoji: '🎯',
    color: '#00d4ff',
    image: imgObjectDetection,
    status: 'completed',
    summary: 'Developed a high-throughput NLP pipeline leveraging BERT embeddings for sentiment analysis, achieving 94.2% accuracy with sub-50ms inference times on a 50k review dataset.',
    challenge: 'Optimizing transformer inference for low-latency deployment while maintaining high accuracy on a large-scale dataset with diverse linguistic patterns.',
    solution: 'Implemented model quantization, batch inference, and FastAPI microservice architecture with Docker containerization for scalable deployment.',
    tech: ['Python', 'PyTorch', 'React', 'Next.js','TypeScript','HuggingFace Transformers', 'FastAPI', 'Docker', 'ONNX', 'SHAP'],
    url: 'https://1-1ixavp0bv-rajmandal11s-projects.vercel.app/',
    github: 'https://github.com/Rajmandal11/Object-Detection',
    impactMetrics: [
      { label: 'Accuracy Score', value: '94.2%' },
      { label: 'Latency', value: '45ms' },
      { label: 'Dataset Size', value: '50,000' }
    ],
    deliverables: ['Fine-Tuned BERT Weights', 'FastAPI Microservice', 'Docker Container', 'SHAP Interpretability'],
    designTokens: {
      primaryColor: '#00d4ff',
      surfaceColor: '#04e7eb',
      typography: 'Space Mono / Syne',
      gridUnit: '8px Base',
      radius: '14px Rounded'
    },
    prototypeState: {
      activeTab: 'Review Sentiment',
      metricValue: '94.2% Positive Confidence',
      graphData: [65, 72, 80, 88, 91, 94, 94]
    }
  },
  {
    id: 'plant-disease-cnn',
    title: 'Plant Disease Classifier',
    subtitle: 'Deep CNN Agritech Vision System',
    category: 'Vision',
    tagline: 'Computer vision crop health inspector trained on 87k images across 38 plant disease classes.',
    year: '2025',
    client: 'Agritech Solutions',
    role: 'Computer Vision Engineer',
    emoji: '🌿',
    image: imgPlantDisease,
    color: '#00ffcc',
    status: 'ready',
    summary: 'Built a deep convolutional neural network with transfer learning (ResNet50 / MobileNet) for instant leaf disease diagnosis in field conditions.',
    challenge: 'Dealing with field illumination variance, camera glare, and heavy background noise in non-studio crop photos.',
    solution: 'Applied real-time data augmentation, CLAHE contrast enhancement, and mobile-friendly model compression.',
    tech: ['TensorFlow', 'Keras', 'OpenCV', 'Python', 'Flask', 'MobileNet'],
    url: 'https://plant-disease-classifier-594877989312.asia-southeast1.run.app',
    github: 'https://github.com/Rajmandal11/plant_detection',
    impactMetrics: [
      { label: 'Top-1 Accuracy', value: '96.8%' },
      { label: 'Disease Classes', value: '38' },
      { label: 'Image Dataset', value: '87,000' }
    ],
    deliverables: ['Custom CNN Model', 'OpenCV Preprocessing Pipeline', 'Web Inspector UI'],
    prototypeState: {
      activeTab: 'Leaf Diagnostic',
      metricValue: 'Late Blight (98.4% Prob)',
      graphData: [20, 45, 75, 85, 92, 95, 97]
    }
  },
  {
    id: 'customer-churn-xgb',
    title: 'Customer Churn Predictor',
    subtitle: 'Explainable ML Predictive Analytics',
    category: 'ML/Data',
    tagline: 'Supervised ML model predicting customer retention risk with SHAP explainability dashboard.',
    year: '2024',
    client: 'Telecom Analytics',
    role: 'Data Scientist & ML Engineer',
    emoji: '📉',
    image: imgChurnDashboard,
    color: '#7c3aff',
    status: 'ready',
    summary: 'Developed an XGBoost classifier predicting churn with 91% recall. Integrated SHAP values to give business managers exact key factor insights for each customer.',
    challenge: 'High feature correlation and imbalanced class distribution leading to false negatives in high-value customer accounts.',
    solution: 'Utilized SMOTE oversampling, hyperparameter tuning with Optuna, and interactive SHAP waterfall plots.',
    tech: ['Python', 'Scikit-learn', 'XGBoost', 'SHAP', 'Pandas', 'Streamlit'],
    url: 'https://github.com/Rajmandal11/CodeSoft_project/blob/main/Cus_churn_prediction.ipynb',
    github: 'https://github.com/Rajmandal11/CodeSoft_project/blob/main/Cus_churn_prediction.ipynb',
    impactMetrics: [
      { label: 'Recall Rate', value: '91.4%' },
      { label: 'ROC-AUC', value: '0.94' },
      { label: 'Cost Reduction', value: '32%' }
    ],
    deliverables: ['XGBoost Pipeline', 'SHAP Dashboard', 'Feature Importance Matrix'],
    prototypeState: {
      activeTab: 'Risk Forecast',
      metricValue: 'High Risk (Score: 0.88)',
      graphData: [30, 50, 65, 78, 85, 89, 91]
    }
  },
  {
    id: 'neural-weave-vis',
    title: 'Neural Weave — NN Visualizer',
    subtitle: 'Interactive 3D Neural Architecture Inspector',
    category: '3D & Motion',
    tagline: 'Real-time 3D graph visualizer animating deep neural network weights, activations, and layer topologies.',
    year: '2025',
    client: 'Educational AI',
    role: 'Full Stack & 3D Artist',
    emoji: '🧠',
    image: imgNeuralWeave,
    color: '#ff6b35',
    status: 'ready',
    summary: 'Designed a WebGL 3D network viewer that visualizes matrix multiplications and gradient backpropagation in real time.',
    challenge: 'Rendering thousands of interactive 3D nodes and signal pulses simultaneously at 60 FPS in browser.',
    solution: 'Engineered custom Three.js instanced geometry with GPU-accelerated particle shaders and web workers.',
    tech: ['Python', 'TensorFlow', 'Three.js', 'D3.js', 'Flask', 'NumPy'],
    url: 'https://github.com/Rajmandal11',
    github: 'https://github.com/Rajmandal11',
    impactMetrics: [
      { label: 'Render FPS', value: '60 FPS' },
      { label: 'Active Nodes', value: '10,000+' },
      { label: 'User Rating', value: '4.9/5' }
    ],
    deliverables: ['WebGL 3D Graph Canvas', 'Live Weight Inspector', 'Interactive Step Debugger'],
    designTokens: {
      primaryColor: '#ff6b35',
      surfaceColor: '#10b981',
      typography: 'Space Mono / Syne',
      gridUnit: '8px Base',
      radius: '14px Rounded'
    },
    prototypeState: {
      activeTab: 'Network Topology',
      metricValue: '60 FPS • 10,000 Active Nodes',
      graphData: [35, 48, 60, 72, 84, 92, 98]
    }
  },
  {
    id: 'face-z',
    title: 'Face-Z — Facial Recognition Engine',
    subtitle: 'Real-Time Face Detection & Verification',
    category: 'ML/Data',
    tagline: 'Built a high-accuracy facial recognition system using deep CNN embeddings and cosine similarity for identity verification.',
    year: '2026',
    client: 'Security & Access Control',
    role: 'Computer Vision Engineer',
    emoji: '👁️',
    image: imgFaceRecognition,
    color: '#ffd700',
    status: 'ready',
    summary: 'Developed a facial recognition pipeline achieving 98% verification accuracy with real-time detection and embedding generation using OpenCV and PyTorch.',
    challenge: 'Handling variations in lighting, pose, and occlusions while maintaining sub-100ms inference times for real-time applications.',
    solution: 'Implemented MTCNN for face detection, ResNet-based embedding extraction, and cosine similarity for identity verification, optimized with ONNX for low-latency inference.',
    tech: ['Python', 'OpenCV', 'PyTorch', 'MTCNN', 'ResNet', 'ONNX', 'Next.js', 'FastAPI', 'TypeScript'],
    url: 'https://github.com/Rajmandal11/ML-project-/tree/main/portfilio/Face-Z%20project',
    github: 'https://github.com/Rajmandal11/ML-project-/tree/main/portfilio/Face-Z%20project',
    impactMetrics: [
      { label: 'Convergence Time', value: '-60%' },
      { label: 'Success Rate', value: '99.1%' },
      { label: 'Training Episodes', value: '2,500' }
    ],
    deliverables: ['MTCNN Face Detection Pipeline', 'ResNet Embedding Model', 'ONNX Real-Time Verification API'],
    designTokens: {
      primaryColor: '#ffd700',
      surfaceColor: '#38bdf8',
      typography: 'Space Mono / Syne',
      gridUnit: '8px Base',
      radius: '14px Rounded'
    },
    prototypeState: {
      activeTab: 'Identity Verification',
      metricValue: '98% Verification Accuracy',
      graphData: [55, 66, 74, 83, 90, 95, 98]
    }
  },
  {
    id: 'covid-tweet-nlp',
    title: 'COVID-19 Tweet Sentiment & Topic Engine',
    subtitle: 'Large-Scale Unstructured NLP Analytics',
    category: 'NLP',
    tagline: 'Analysing 500k social posts using TF-IDF, LDA topic modeling, and zero-shot transformer classifiers.',
    year: '2024',
    client: 'Data Research Project',
    role: 'Data Scientist',
    emoji: '📊',
    image: imgSentimentNlp,
    color: '#10b981',
    status: 'offline',
    summary: 'Processed half a million tweets to identify public sentiment trajectories, panic signals, and emerging topics across global regions.',
    challenge: 'Cleaning noisy social media text containing typos, slang, multi-language hashtags, and duplicate bot entries.',
    solution: 'Formulated custom regex pipelines, NLTK lemmatization, and latent Dirichlet allocation (LDA) topic clusters.',
    tech: ['Python', 'NLTK', 'Transformers', 'Pandas', 'Seaborn', 'Scikit-learn'],
    url: 'https://github.com/Rajmandal11',
    github: 'https://github.com/Rajmandal11',
    impactMetrics: [
      { label: 'Tweets Parsed', value: '500,000' },
      { label: 'Topic Clusters', value: '15 Core' },
      { label: 'Sentiment Precision', value: '89.5%' }
    ],
    deliverables: ['LDA Topic Explorer', 'Sentiment Shift Analytics', 'Automated WordCloud Engine'],
    designTokens: {
      primaryColor: '#10b981',
      surfaceColor: '#38bdf8',
      typography: 'Space Mono / Syne',
      gridUnit: '8px Base',
      radius: '14px Rounded'
    },
    prototypeState: {
      activeTab: 'Sentiment Trajectory',
      metricValue: '89.5% Sentiment Precision',
      graphData: [25, 40, 55, 68, 79, 86, 90]
    }
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ibm-ds',
    icon: '🎓',
    year: '2024',
    title: 'IBM Data Science Professional Certificate',
    org: 'IBM — Coursera',
    badge: '📜',
    desc: '10-course specialization covering Python, SQL, machine learning, data analysis, and capstone with real-world datasets. Completed with distinction.'
  },
  {
    id: 'kaggle-titanic',
    icon: '🏆',
    year: '2024',
    title: 'Kaggle Competition — Top 20%',
    org: 'Titanic: Machine Learning From Disaster',
    badge: '🥈',
    desc: 'Achieved 0.79+ accuracy using ensemble learning techniques (Random Forest + XGBoost) with engineered feature interactions. Ranked in top 20% globally.'
  },
  {
    id: 'ml-stanford',
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Stanford_University_seal_2003.svg',
    icon: '🤖',
    year: '2026',
    title: 'Deep Learning Specialization',
    org: 'deeplearning.ai — Andrew Ng',
    badge: '🔵',
    desc: 'Supervised, unsupervised, and reinforcement learning principles with hands-on mathematical formulations and Python algorithms.'
  },
  {
    id: 'ml-specialization',
    icon: '🤖',
    year: '2025',
    title: 'Machine Learning Specialization',
    org: 'Stanford University / Coursera (Andrew Ng)',
    badge: '🔵',
    desc: 'Supervised, unsupervised, and reinforcement learning principles with hands-on mathematical formulations and Python algorithms.'
  },
  {
    id: 'ml-az',
    icon: '🌟',
    year: '2025',
    title: 'Machine Learning A–Z',
    org: 'Udemy — SuperDataScience',
    badge: '✨',
    desc: '44 hours of practical machine learning engineering covering regression, classification, clustering, association rule learning, and deep learning.'
  },
  {
    id: 'nptel-python',
    icon: '💡',
    year: '2024',
    title: 'Python for Data Science ',
    org: 'SimpliLearn',
    badge: '🔵',
    desc: 'Covered NumPy, Pandas, Matplotlib, statistical inference, hypothesis testing, and data wrangling. Scored 82/100 with distinction.'
  },
  {
    id: 'fcc-analysis',
    icon: '📊',
    year: '2024',
    title: 'Data Analysis with Python',
    org: 'freeCodeCamp',
    badge: '📜',
    desc: 'Completed capstone projects including Mean-Variance-Standard Deviation Calculator, Demographic Data Analyzer, and Medical Examination Visualizer.'
  },
  {
    id: 'btech-degree',
    icon: '🚀',
    year: '2024–2028',
    title: 'B.Tech — CSE (AI & ML Specialization)',
    org: 'MMDU, Mullana, Ambala, Haryana',
    badge: '🎓',
    desc: 'Bachelor of Technology degree focused on Artificial Intelligence, Machine Learning, Data Structures, Operating Systems, DBMS, and Algorithm Design.'
  },
  {
    id: 'python-masterclass',
    icon: '🐍',
    image: '/images/5.jpeg',
    year: '2024',
    title: 'Python Programming Masterclass',
    org: 'Udemy',
    badge: '✨',
    desc: 'Core Python, Object-Oriented Programming, File Handling, REST APIs, and Scripting Automation — the foundation for all AI/ML developments.'
  }
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    id: 'exp-1',
    date: '2025 – Present',
    role: 'AI / ML Engineer (Self-Directed & Open Source)',
    company: 'Independent Systems & Open Source',
    desc: 'Designing end-to-end machine learning systems — from fine-tuning transformer models and building FastAPI microservices to deploying Docker containers and constructing WebGL 3D neural network visualizers.',
    tags: ['PyTorch', 'TensorFlow', 'FastAPI', 'Docker', 'MLOps', 'Three.js']
  },
  {
    id: 'exp-2',
    date: '2027',
    role: 'Deep Learning & NLP Research',
    company: 'Academic Projects — MMDU',
    desc: 'Explored transformer-based architectures (BERT, RoBERTa) and fine-tuned models for domain-specific text classification. Optimised inference speed using ONNX and quantified classification confidence.',
    tags: ['BERT', 'HuggingFace', 'Python', 'FastAPI', 'PyTorch']
  },
  {
    id: 'exp-3',
    date: '2025-2026',
    role: 'Data Science & Analytics Developer',
    company: 'Academic & Projects — MMDU',
    desc: 'Created predictive modeling systems, customer churn forecasters with SHAP explainability, and EDA pipelines for complex structured datasets.',
    tags: ['Pandas', 'Seaborn', 'Scikit-learn', 'SQL', 'XGBoost', 'SHAP']
  },
  {
    id: 'exp-4',
    date: '2024-2025',
    role: 'ML Foundations & Competition Specialization',
    company: 'Coursera / Kaggle / deeplearning.ai',
    desc: 'Completed intensive specializations in ML algorithms and Kaggle competitions. Ranked in top 20% on Kaggle Titanic ML challenge using ensemble modeling.',
    tags: ['TensorFlow', 'Scikit-learn', 'Kaggle', 'NumPy', 'RandomForest']
  },
  {
    id: 'exp-5',
    date: '2026',
    role: 'Computer Vision Exploration',
    company: 'Self-Directed — OpenCV & Keras',
    desc: 'Constructed custom CNNs for image classification and feature extraction. Implemented edge detection, contour mapping, and transfer learning pipelines.',
    tags: ['Keras', 'OpenCV', 'CNNs', 'Transfer Learning']
  },
  {
    id: 'exp-6',
    date: '2024 - 2028',
    role: 'B.Tech Computer Science — Foundation Year',
    company: 'MMDU, Mullana, Ambala',
    desc: 'Established strong software engineering foundations in Python, Java, Data Structures, Algorithms, Linear Algebra, and Calculus.',
    tags: ['Python', 'Java', 'Algorithms', 'Linear Algebra']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    text: 'Raj approaches ML problems with solid mathematical intuition and engineering discipline. His BERT sentiment analysis microservice demonstrated true production readiness with low-latency REST endpoints.',
    name: 'Priya Singh',
    role: 'ML Engineer @ TechStartup',
    avatar: 'PS',
    stars: 5
  },
  {
    id: 't-2',
    text: 'What stands out about Raj is how effectively he communicates complex model behavior to non-technical stakeholders. His SHAP explainability dashboard made churn predictions immediately actionable.',
    name: 'Arjun Mehta',
    role: 'Product Lead @ Analytics Co.',
    avatar: 'AM',
    stars: 5
  },
  {
    id: 't-3',
    text: 'Raj\'s reinforcement learning DQN implementation was exceptionally clean, well-structured, and mathematically grounded. A brilliant AI engineer with a bright future.',
    name: 'Dr. Kaur',
    role: 'Associate Professor — MMDU',
    avatar: 'DK',
    stars: 5
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'blog-1',
    tag: 'Tutorial',
    title: 'Fine-Tuning BERT for Sentiment Analysis — End-to-End Guide',
    excerpt: 'A step-by-step breakdown of tokenization, custom classification heads, training loops, and deploying a fine-tuned BERT model as a FastAPI service with <50ms latency.',
    date: 'Mar 15, 2025',
    readTime: '14 min',
    emoji: '🤗'
  },
  {
    id: 'blog-2',
    tag: 'Deep Dive',
    title: 'SHAP Values — Making Black-Box Machine Learning Models Explainable',
    excerpt: 'How to leverage SHapley Additive exPlanations to interpret tree-based and neural models, generating waterfall plots business managers can trust.',
    date: 'Feb 8, 2025',
    readTime: '10 min',
    emoji: '🔍'
  },
  {
    id: 'blog-3',
    tag: 'MLOps',
    title: 'MLOps Strategy: Experiment Tracking, Data Versioning & CI/CD Pipelines',
    excerpt: 'Why adopting MLflow experiment tracking, DVC data versioning, and Docker containerization early accelerates ML development tenfold.',
    date: 'Jan 20, 2027',
    readTime: '7 min',
    emoji: '🚀'
  },
  {
    id: 'blog-4',
    tag: 'Computer Vision',
    title: 'Building a CNN Plant Disease Classifier from Scratch with PyTorch',
    excerpt: 'Handling class imbalance, applying real-time data augmentations, and training deep convolutional networks on 87k high-res leaf images.',
    date: 'Dec 5, 2026',
    readTime: '16 min',
    emoji: '🌿'
  },
  {
    id: 'blog-5',
    tag: 'Reinforcement Learning',
    title: 'Deep Q-Networks (DQN): From Bellman Equations to Working Code',
    excerpt: 'Implementing a DQN agent with target networks and prioritized experience replay in PyTorch to solve autonomous spatial navigation.',
    date: 'Jan 10, 2027',
    readTime: '20 min',
    emoji: '🎲'
  },
  {
    id: 'blog-6',
    tag: 'Data Engineering',
    title: 'Why Every Machine Learning Engineer Must Master SQL & Data Wrangling',
    excerpt: 'Before Pandas and PyTorch — SQL gives you the structured relational mindset that makes dataset preparation fast and scalable.',
    date: 'Oct 3, 2028',
    readTime: '6 min',
    emoji: '🗄️'
  }
];

export const PILLARS: Pillar[] = [
  {
    number: '01',
    title: 'Deep Learning & Neural Architectures',
    subtitle: 'Transformers, CNNs & Sequence Models',
    description: 'Custom neural network architectures engineered for state-of-the-art accuracy in NLP classification, object detection, and sequential forecasting.',
    iconName: 'Cpu',
    tags: ['PyTorch', 'TensorFlow', 'BERT', 'ResNet']
  },
  {
    number: '02',
    title: 'End-to-End MLOps & API Pipelines',
    subtitle: 'Production Inference & Model Registry',
    description: 'Containerized FastAPI services, ONNX model quantization, automated data preprocessing, and real-time model telemetry.',
    iconName: 'Globe',
    tags: ['FastAPI', 'Docker', 'MLflow', 'ONNX']
  },
  {
    number: '03',
    title: 'Explainable AI & Visual Analytics',
    subtitle: 'SHAP Insights & Interactive 3D Graphs',
    description: 'Demystifying black-box ML predictions using SHAP feature attributions and WebGL 3D network visualizations.',
    iconName: 'Sparkles',
    tags: ['SHAP', 'Three.js', 'D3.js', 'Seaborn']
  }
];

export const PRESS_ARTICLES: PressArticle[] = [
  {
    id: 'press-1',
    publisher: 'AI Tech Journal / Jan 2026',
    date: 'Jan 15, 2026',
    title: 'Raj Mandal introduces low-latency BERT sentiment microservice for high-throughput text streams',
    snippet: 'Exploring how fine-tuned transformer weights and Docker containerization enabled 94% accuracy with 45ms inference times.',
    url: '#'
  },
  {
    id: 'press-2',
    publisher: 'Agritech Innovation / Dec 2025',
    date: 'Dec 22, 2025',
    title: 'Deep Learning Leaf Inspector achieves 96.8% accuracy on 87k agricultural dataset',
    snippet: 'Highlighting real-world applications of computer vision in assisting farmers with instant crop disease detection.',
    url: '#'
  },
  {
    id: 'press-3',
    publisher: 'Analytics World / Nov 2025',
    date: 'Nov 10, 2025',
    title: 'Demystifying Churn Forecasting with Explainable Boosting and SHAP Analytics',
    snippet: 'A look at how business stakeholders leverage feature importance plots to proactively retain enterprise customers.',
    url: '#'
  }
];
