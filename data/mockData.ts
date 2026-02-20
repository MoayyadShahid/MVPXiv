/**
 * Mock data for MVPXiv — ≥3 batches, ≥10 ideas total.
 * Used when USE_MOCK is true in lib/api.ts
 */

import type { Batch, Idea } from "@/lib/types";

const BATCHES: Batch[] = [
  {
    id: "2026-02-19",
    date: "2026-02-19",
    createdAt: "2026-02-19T08:00:00Z",
    sources: ["cs.LG", "cs.MA", "https://arxiv.org/list/cs.LG/new", "https://arxiv.org/list/cs.MA/new"],
    researchThemes: [
      "Agentic workflows and tool use in LLMs",
      "Multi-modal RAG and retrieval augmentation",
      "Small Language Model optimization for edge deployment",
    ],
    countsByCategory: { backlog: 1, considerable: 2, promising: 2, lucrative: 2 },
    ideaIds: [
      "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
      "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
      "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
      "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
      "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
      "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c",
      "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d",
    ],
  },
  {
    id: "2026-02-18",
    date: "2026-02-18",
    createdAt: "2026-02-18T08:00:00Z",
    sources: ["cs.LG", "cs.MA"],
    researchThemes: [
      "Multi-agent coordination and emergent behavior",
      "Efficient attention mechanisms for long context",
      "AI safety and alignment in production systems",
    ],
    countsByCategory: { backlog: 2, considerable: 1, promising: 2, lucrative: 1 },
    ideaIds: [
      "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e",
      "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
      "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a",
      "e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b",
      "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c",
      "a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d",
    ],
  },
  {
    id: "2026-02-17",
    date: "2026-02-17",
    createdAt: "2026-02-17T08:00:00Z",
    sources: ["cs.LG", "cs.MA"],
    researchThemes: [
      "Knowledge distillation and model compression",
      "Reinforcement learning from human feedback (RLHF)",
      "Graph neural networks for recommendation",
    ],
    countsByCategory: { backlog: 1, considerable: 2, promising: 1, lucrative: 2 },
    ideaIds: [
      "b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e",
      "c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f",
      "d6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a",
      "e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b",
      "f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c",
    ],
  },
];

const IDEAS: Idea[] = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    batchDate: "2026-02-19",
    category: "LUCRATIVE",
    startupName: "RAGForge",
    valueProposition:
      "RAGForge turns enterprise knowledge bases into production-grade retrieval-augmented systems. We implement state-of-the-art hybrid search with learned embeddings and sparse retrieval, cutting hallucination rates by 60%.",
    technicalCore:
      "Implement the paper's dual-encoder + cross-encoder reranking pipeline with late interaction for sub-50ms retrieval latency.",
    implementation:
      "Build a distributed crawler using Ray, implement a low-latency FastAPI endpoint with Redis caching, and create a real-time monitoring dashboard with Prometheus.",
    techStack: ["PyTorch", "Qdrant", "LangGraph", "FastAPI", "Redis", "Ray", "Modal", "ONNX"],
    resumeBullets: [
      "Reduced inference latency by 40% by implementing the RAGForge dual-encoder technique with ONNX optimization.",
      "Designed a hybrid retrieval pipeline serving 10K QPS using Qdrant and Redis with 99.9% uptime.",
      "Led end-to-end RAG deployment from data ingestion to production monitoring across 5 enterprise clients.",
    ],
    whyThisPaper:
      "Hiring managers value candidates who can translate cutting-edge retrieval research into production systems with measurable impact.",
    paper: {
      title: "Efficient Hybrid Retrieval with Learned Sparse and Dense Representations",
      url: "https://arxiv.org/abs/2401.12345",
      authors: ["Jane Doe", "John Smith"],
      abstract: "We propose a hybrid retrieval approach combining learned sparse and dense representations for improved recall and latency.",
      arxivId: "2401.12345",
      publishedAt: "2026-02-15",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-19T08:30:00Z",
  },
  {
    id: "b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e",
    batchDate: "2026-02-19",
    category: "PROMISING",
    startupName: "AgentOS",
    valueProposition:
      "AgentOS provides a runtime for autonomous AI agents that use tools, browse the web, and execute multi-step workflows. We focus on reliability and observability for production agent deployments.",
    technicalCore:
      "Implement the paper's tool-use planning module with structured output and fallback handling for deterministic agent behavior.",
    implementation:
      "Create a LangGraph-based agent runtime with streaming, implement a tool registry with validation, and deploy on Modal for serverless GPU scaling.",
    techStack: ["LangGraph", "OpenAI", "Anthropic", "Modal", "PostgreSQL", "Temporal"],
    resumeBullets: [
      "Architected an agent runtime handling 50K daily tool calls with 99.5% success rate using LangGraph and structured fallbacks.",
      "Implemented a tool registry with automatic schema validation reducing integration errors by 80%.",
      "Deployed serverless agent infrastructure on Modal achieving sub-second cold starts for GPU workloads.",
    ],
    whyThisPaper:
      "Demonstrates ability to operationalize agentic AI research into reliable, observable systems—a key differentiator for MLE roles.",
    paper: {
      title: "Structured Tool Use for Reliable Autonomous Agents",
      url: "https://arxiv.org/abs/2402.23456",
      authors: ["Alice Chen", "Bob Lee"],
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-19T08:35:00Z",
  },
  {
    id: "c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f",
    batchDate: "2026-02-19",
    category: "CONSIDERABLE",
    startupName: "SLM Edge",
    valueProposition:
      "SLM Edge deploys small language models (1–3B params) on edge devices for offline, low-latency inference. We optimize for mobile and IoT with quantization and pruning.",
    technicalCore:
      "Implement the paper's knowledge distillation and structured pruning pipeline to compress 7B models to 1B with <2% accuracy drop.",
    implementation:
      "Build a training pipeline with PyTorch and Hugging Face, implement ONNX export for mobile, and create a benchmarking suite for edge latency.",
    techStack: ["PyTorch", "ONNX", "TensorRT", "Hugging Face", "CoreML", "Android NN"],
    resumeBullets: [
      "Compressed a 7B LLM to 1B parameters with 1.8% accuracy degradation using structured pruning and distillation.",
      "Achieved 50ms inference latency on mobile devices via ONNX and CoreML optimization.",
      "Shipped edge ML pipeline serving 100K daily inferences across iOS and Android with 99% offline availability.",
    ],
    whyThisPaper:
      "Edge ML and model compression are critical for 2026—candidates who ship efficient models stand out.",
    paper: {
      title: "Structured Pruning for Efficient Small Language Models",
      url: "https://arxiv.org/abs/2403.34567",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-19T08:40:00Z",
  },
  {
    id: "d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a",
    batchDate: "2026-02-19",
    category: "LUCRATIVE",
    startupName: "MultiAgent Labs",
    valueProposition:
      "MultiAgent Labs builds simulation environments for training and evaluating multi-agent systems. We focus on emergent coordination and scalable environments for research and industry.",
    technicalCore:
      "Implement the paper's decentralized multi-agent coordination protocol with emergent communication and shared reward shaping.",
    implementation:
      "Build a GPU-accelerated simulation using JAX, implement a distributed training loop with Ray, and create a web dashboard for experiment tracking.",
    techStack: ["JAX", "Ray", "Weights & Biases", "Docker", "Kubernetes", "FastAPI"],
    resumeBullets: [
      "Designed a multi-agent simulation serving 1M steps/day with JAX and Ray for 10x faster iteration.",
      "Implemented emergent communication protocols improving task completion by 35% in cooperative settings.",
      "Deployed a distributed training pipeline on Kubernetes with automatic scaling for 50+ concurrent experiments.",
    ],
    whyThisPaper:
      "Multi-agent systems are a hot research area—translating theory to scalable infrastructure is highly valued.",
    paper: {
      title: "Emergent Coordination in Decentralized Multi-Agent Systems",
      url: "https://arxiv.org/abs/2404.45678",
      primaryCategory: "cs.MA",
    },
    createdAt: "2026-02-19T08:45:00Z",
  },
  {
    id: "e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b",
    batchDate: "2026-02-19",
    category: "PROMISING",
    startupName: "SecureLLM",
    valueProposition:
      "SecureLLM provides privacy-preserving inference and fine-tuning for LLMs. We enable enterprises to use sensitive data without exposing it to model providers.",
    technicalCore:
      "Implement the paper's differential privacy mechanism for fine-tuning and secure multi-party computation for inference.",
    implementation:
      "Build a fine-tuning pipeline with DP-SGD, implement encrypted inference with homomorphic encryption, and create audit logging for compliance.",
    techStack: ["PyTorch", "Opacus", "TenSEAL", "FastAPI", "PostgreSQL", "Vault"],
    resumeBullets: [
      "Applied differential privacy to LLM fine-tuning achieving (ε=1, δ=1e-5) with <5% utility loss.",
      "Implemented encrypted inference pipeline reducing data exposure risk for 3 enterprise clients.",
      "Built compliance audit system for AI/ML deployments meeting SOC2 and GDPR requirements.",
    ],
    whyThisPaper:
      "AI security and privacy are table stakes for enterprise adoption—this project demonstrates both.",
    paper: {
      title: "Differential Privacy for Large Language Model Fine-Tuning",
      url: "https://arxiv.org/abs/2405.56789",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-19T08:50:00Z",
  },
  {
    id: "f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c",
    batchDate: "2026-02-19",
    category: "CONSIDERABLE",
    startupName: "Multimodal RAG",
    valueProposition:
      "Multimodal RAG extends retrieval-augmented generation to images, audio, and video. We enable enterprises to query across all modalities with a single interface.",
    technicalCore:
      "Implement the paper's cross-modal alignment and unified embedding space for text, image, and audio retrieval.",
    implementation:
      "Build a multimodal embedding pipeline with CLIP and audio encoders, implement a vector store with Qdrant, and create a FastAPI service with streaming responses.",
    techStack: ["CLIP", "PyTorch", "Qdrant", "FastAPI", "Whisper", "FFmpeg"],
    resumeBullets: [
      "Built cross-modal retrieval system indexing 1M images and 100K audio clips with sub-100ms query latency.",
      "Unified text, image, and audio into a single embedding space improving retrieval recall by 25%.",
      "Deployed multimodal RAG API serving 5K requests/day with 99.9% uptime for 2 enterprise clients.",
    ],
    whyThisPaper:
      "Multimodal AI is the future—candidates who build end-to-end multimodal systems are highly sought.",
    paper: {
      title: "Unified Cross-Modal Retrieval for Multimodal RAG",
      url: "https://arxiv.org/abs/2406.67890",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-19T08:55:00Z",
  },
  {
    id: "a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d",
    batchDate: "2026-02-19",
    category: "BACKLOG",
    startupName: "AttentionTune",
    valueProposition:
      "AttentionTune provides custom attention mechanisms for domain-specific LLMs. We help researchers and enterprises optimize attention for long context and specialized tasks.",
    technicalCore:
      "Implement the paper's sparse attention variant with learned sparsity patterns for 4x longer context at same compute.",
    implementation:
      "Build a PyTorch extension for custom attention, create a benchmarking suite, and offer consulting for attention optimization.",
    techStack: ["PyTorch", "CUDA", "Triton", "Hugging Face", "Weights & Biases"],
    resumeBullets: [
      "Implemented sparse attention mechanism extending context length by 4x with <10% compute overhead.",
      "Optimized attention kernel with Triton achieving 2x speedup over baseline PyTorch implementation.",
      "Consulted on attention architecture for 3 research teams, improving throughput by 30% on average.",
    ],
    whyThisPaper:
      "Low-level ML optimization and custom kernels demonstrate deep systems + ML skills.",
    paper: {
      title: "Learned Sparse Attention for Long Context Language Models",
      url: "https://arxiv.org/abs/2407.78901",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-19T09:00:00Z",
  },
  {
    id: "b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e",
    batchDate: "2026-02-18",
    category: "PROMISING",
    startupName: "CoordNet",
    valueProposition:
      "CoordNet enables multi-agent coordination in complex environments. We provide simulation and training infrastructure for emergent cooperative behavior.",
    technicalCore:
      "Implement the paper's graph-based coordination protocol with message passing and shared value functions.",
    implementation:
      "Build a JAX-based simulation, implement PPO with shared critic, and create a web UI for visualizing agent behavior.",
    techStack: ["JAX", "RLlib", "Ray", "React", "FastAPI", "PostgreSQL"],
    resumeBullets: [
      "Designed graph-based coordination protocol improving multi-agent task completion by 40% in benchmark environments.",
      "Built JAX simulation achieving 100K steps/second for 100-agent scenarios.",
      "Shipped training infrastructure used by 5 research teams for multi-agent RL experiments.",
    ],
    whyThisPaper:
      "Multi-agent RL is a growing field—infrastructure builders are in high demand.",
    paper: {
      title: "Graph-Based Coordination for Multi-Agent Reinforcement Learning",
      url: "https://arxiv.org/abs/2408.89012",
      primaryCategory: "cs.MA",
    },
    createdAt: "2026-02-18T08:30:00Z",
  },
  {
    id: "c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f",
    batchDate: "2026-02-18",
    category: "LUCRATIVE",
    startupName: "LongContext AI",
    valueProposition:
      "LongContext AI provides efficient long-context inference for LLMs. We reduce memory and latency for 100K+ token contexts.",
    technicalCore:
      "Implement the paper's sliding window attention with state compression for O(1) memory in long sequences.",
    implementation:
      "Build a custom inference engine with vLLM integration, implement state caching, and create a benchmarking dashboard.",
    techStack: ["vLLM", "PyTorch", "CUDA", "Triton", "Prometheus", "Grafana"],
    resumeBullets: [
      "Reduced long-context memory usage by 60% using sliding window attention with state compression.",
      "Achieved 2x throughput for 100K token contexts via custom Triton kernels and vLLM integration.",
      "Deployed long-context inference serving 10K requests/day with p99 latency under 2 seconds.",
    ],
    whyThisPaper:
      "Long context is a key differentiator for LLM applications—efficiency matters at scale.",
    paper: {
      title: "Efficient Long Context Inference with Sliding Window Attention",
      url: "https://arxiv.org/abs/2409.90123",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-18T08:35:00Z",
  },
  {
    id: "d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a",
    batchDate: "2026-02-18",
    category: "BACKLOG",
    startupName: "AlignGuard",
    valueProposition:
      "AlignGuard monitors and detects alignment drift in production LLMs. We provide real-time alerts and audit trails for responsible AI deployment.",
    technicalCore:
      "Implement the paper's distribution shift detection for LLM outputs using embedding-based anomaly detection.",
    implementation:
      "Build a monitoring pipeline with embedding extraction, implement drift detection with statistical tests, and create an alerting system.",
    techStack: ["PyTorch", "Prometheus", "Grafana", "FastAPI", "PostgreSQL", "Redis"],
    resumeBullets: [
      "Designed drift detection system catching 3 production incidents before user impact.",
      "Implemented embedding-based anomaly detection with 95% recall for harmful output shifts.",
      "Built audit pipeline logging 1M+ inferences/day for compliance and debugging.",
    ],
    whyThisPaper:
      "AI safety in production is increasingly important—monitoring and alignment are key skills.",
    paper: {
      title: "Detecting Alignment Drift in Production Language Models",
      url: "https://arxiv.org/abs/2410.01234",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-18T08:40:00Z",
  },
  {
    id: "e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b",
    batchDate: "2026-02-18",
    category: "CONSIDERABLE",
    startupName: "GraphRec",
    valueProposition:
      "GraphRec builds graph neural network-based recommendation systems. We combine collaborative filtering with content signals for cold-start and long-tail items.",
    technicalCore:
      "Implement the paper's heterogeneous graph attention for user-item-content tripartite graphs.",
    implementation:
      "Build a PyTorch Geometric training pipeline, implement real-time inference with Redis, and create an A/B testing framework.",
    techStack: ["PyTorch Geometric", "Redis", "PostgreSQL", "FastAPI", "Kubernetes"],
    resumeBullets: [
      "Improved cold-start recommendation recall by 35% using heterogeneous graph attention.",
      "Deployed GNN recommendation model serving 100K predictions/second with <10ms latency.",
      "Built A/B testing framework for recommendation experiments used across 3 product teams.",
    ],
    whyThisPaper:
      "GNNs for recommendation are a proven use case—production experience is valuable.",
    paper: {
      title: "Heterogeneous Graph Attention for Recommendation",
      url: "https://arxiv.org/abs/2411.12345",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-18T08:45:00Z",
  },
  {
    id: "f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c",
    batchDate: "2026-02-18",
    category: "PROMISING",
    startupName: "RLHF Studio",
    valueProposition:
      "RLHF Studio provides end-to-end tooling for reinforcement learning from human feedback. We streamline preference data collection, reward model training, and policy optimization.",
    technicalCore:
      "Implement the paper's multi-objective reward modeling with uncertainty quantification for safer RLHF.",
    implementation:
      "Build a data collection UI, implement PPO with reward model, create a training dashboard, and offer hosted fine-tuning.",
    techStack: ["PyTorch", "TRL", "Weights & Biases", "React", "FastAPI", "Modal"],
    resumeBullets: [
      "Built RLHF pipeline used to fine-tune 3 production models with 50% faster iteration.",
      "Implemented multi-objective reward modeling reducing reward hacking by 40% in evaluations.",
      "Shipped preference data collection UI used by 10 teams for 100K+ annotations.",
    ],
    whyThisPaper:
      "RLHF is critical for aligned LLMs—full-stack RLHF tooling is highly valuable.",
    paper: {
      title: "Multi-Objective Reward Modeling for Safer RLHF",
      url: "https://arxiv.org/abs/2412.23456",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-18T08:50:00Z",
  },
  {
    id: "b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e",
    batchDate: "2026-02-17",
    category: "LUCRATIVE",
    startupName: "DistillPro",
    valueProposition:
      "DistillPro automates knowledge distillation from large to small models. We optimize for latency, accuracy, and deployment targets (edge, mobile, browser).",
    technicalCore:
      "Implement the paper's layer-wise distillation with attention transfer and response-based distillation.",
    implementation:
      "Build a Hugging Face-based pipeline, implement ONNX/TensorRT export, and create a benchmarking suite for target devices.",
    techStack: ["PyTorch", "Hugging Face", "ONNX", "TensorRT", "CoreML", "Modal"],
    resumeBullets: [
      "Distilled 70B model to 3B with 90% of original capability using layer-wise and response distillation.",
      "Achieved 20ms inference on mobile via ONNX and CoreML optimization for distilled model.",
      "Shipped distillation pipeline used by 5 teams to deploy models on edge and mobile.",
    ],
    whyThisPaper:
      "Model compression is essential for deployment—candidates who ship efficient models are in demand.",
    paper: {
      title: "Layer-Wise Knowledge Distillation for Efficient Model Deployment",
      url: "https://arxiv.org/abs/2501.34567",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-17T08:30:00Z",
  },
  {
    id: "c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f",
    batchDate: "2026-02-17",
    category: "CONSIDERABLE",
    startupName: "AgentBench",
    valueProposition:
      "AgentBench provides standardized benchmarks for evaluating AI agents. We measure tool use, planning, and long-horizon task completion.",
    technicalCore:
      "Implement the paper's benchmark suite with diverse environments and automated evaluation metrics.",
    implementation:
      "Build a benchmark runner with Docker, implement evaluation harness, and create a leaderboard and analysis dashboard.",
    techStack: ["Docker", "FastAPI", "PostgreSQL", "React", "Weights & Biases"],
    resumeBullets: [
      "Designed agent benchmark suite used by 20+ research teams for standardized evaluation.",
      "Implemented automated evaluation reducing manual review time by 80%.",
      "Built leaderboard and analysis dashboard with 5K monthly active users.",
    ],
    whyThisPaper:
      "Benchmarking and evaluation are critical for AI progress—infrastructure is valuable.",
    paper: {
      title: "AgentBench: A Comprehensive Benchmark for AI Agent Evaluation",
      url: "https://arxiv.org/abs/2502.45678",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-17T08:35:00Z",
  },
  {
    id: "d6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a",
    batchDate: "2026-02-17",
    category: "LUCRATIVE",
    startupName: "PrivacyFirst AI",
    valueProposition:
      "PrivacyFirst AI enables federated learning and differential privacy for enterprise ML. We help teams train on sensitive data without centralizing it.",
    technicalCore:
      "Implement the paper's federated learning with personalized differential privacy and secure aggregation.",
    implementation:
      "Build a federated training framework, implement secure aggregation with homomorphic encryption, and create a deployment toolkit.",
    techStack: ["PyTorch", "Opacus", "TenSEAL", "Kubernetes", "gRPC", "FastAPI"],
    resumeBullets: [
      "Deployed federated learning across 10 clients with (ε=2) differential privacy and <10% utility loss.",
      "Implemented secure aggregation reducing communication overhead by 50% vs baseline.",
      "Shipped privacy-preserving ML toolkit adopted by 2 healthcare and 1 financial client.",
    ],
    whyThisPaper:
      "Privacy-preserving ML is essential for regulated industries—demand is growing.",
    paper: {
      title: "Federated Learning with Personalized Differential Privacy",
      url: "https://arxiv.org/abs/2503.56789",
      primaryCategory: "cs.LG",
    },
    createdAt: "2026-02-17T08:40:00Z",
  },
];

const ideasById = new Map(IDEAS.map((i) => [i.id, i]));
const ideasByBatchDate = new Map<string, Idea[]>();
for (const idea of IDEAS) {
  const list = ideasByBatchDate.get(idea.batchDate) ?? [];
  list.push(idea);
  ideasByBatchDate.set(idea.batchDate, list);
}

export function getMockLatestBatch(): { batch: Batch; ideas: Idea[] } {
  const batch = BATCHES[0]!;
  const ideas = (batch.ideaIds.map((id) => ideasById.get(id)).filter(Boolean) as Idea[]).sort(
    (a, b) => a.createdAt.localeCompare(b.createdAt)
  );
  return { batch, ideas };
}

export function getMockBatches(): Batch[] {
  return [...BATCHES];
}

export function getMockBatchByDate(date: string): { batch: Batch; ideas: Idea[] } {
  const batch = BATCHES.find((b) => b.date === date);
  if (!batch) throw new Error(`Batch not found: ${date}`);
  const ideas = (batch.ideaIds.map((id) => ideasById.get(id)).filter(Boolean) as Idea[]).sort(
    (a, b) => a.createdAt.localeCompare(b.createdAt)
  );
  return { batch, ideas };
}

export function getMockIdeaById(id: string): Idea {
  const idea = ideasById.get(id);
  if (!idea) throw new Error(`Idea not found: ${id}`);
  return idea;
}
