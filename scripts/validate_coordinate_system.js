/** Reject mixed extraction spaces before building a corrected DNA database. */
export function validateCoordinateSystem(dna, expected) {
    const cfg = dna.metadata?.extractor_config;
    if (!cfg || !expected) throw new Error('Missing coordinate-system provenance');
    if (!Array.isArray(dna.signature) || dna.signature.length !== 128 ||
        !dna.signature.every(Number.isFinite) || dna.signature.every(value => value === 0)) {
        throw new Error('Invalid 128-dimensional DNA signature');
    }
    const actual = {
        pipeline_version: cfg.pipeline_version,
        encoder: cfg.encoder,
        encoder_revision: cfg.provenance?.encoder_revision,
        pre_agg_embed_dim: cfg.pre_agg_embed_dim,
        normalize_embeddings: cfg.normalize_embeddings,
        projection_sha256: cfg.projection_sha256,
        probe_order_sha256: cfg.probe_order_sha256,
        probe_count: dna.metadata.probe_count,
    };
    for (const [key, value] of Object.entries(expected)) {
        if (actual[key] !== value) throw new Error(`Incompatible DNA coordinate field: ${key}`);
    }
    return actual;
}
