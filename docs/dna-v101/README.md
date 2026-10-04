# Corrected cached-response DNA

The public legacy extractor standardized each model separately, projected responses individually, then truncated their concatenation. These batches instead use the official v1.0.1 TextDNAExtractor: Qwen3-Embedding-8B, the same ordered 100 historical random Chinese probes, 64 coordinates per response, concatenation, and a shared seed-42 6,400-to-128 projection. Extra row L2 normalization is disabled.

This replays saved responses; it does not regenerate answers or reproduce the new default 600-probe benchmark protocol. The encoder uses float32 and its default 40,960-token limit. Numerical equivalence of memory-efficient attention was checked on a short sentence; exact equality across GPU attention kernels is not claimed.

Original response caches and replay arrays remain archived locally. Published files carry source hashes, encoder/projection/probe provenance, and empty-answer slots. `dna_sha256` in a published summary hashes its published DNA file; `replay_dna_sha256` hashes the original replay artifact before portable metadata adaptation.

Unclassified empty responses are withheld from the active comparison database. Documented refusals retain zero slots. Each JSON batch manifest lists published and withheld models. Complete replay: 1,793 model/mode entries; published: 183 chat and 1,427 raw; withheld: 183. Separate incompatible historical caches are outside these counts.

The two website modes contain compatible signatures within each mode. Migration switches chat first and raw in its first batch. Historical datasets are retained. Build validation rejects mixed encoders, projections, probe orders and normalization. Merge the batch PRs in order; all target upstream main.
