import { describe, expect, it } from 'vitest';
// @ts-expect-error JavaScript build helper has no declaration file.
import { validateCoordinateSystem } from '../scripts/validate_coordinate_system.js';

const expected = { pipeline_version: 'text-dna-concat-v1', encoder: 'Qwen/Qwen3-Embedding-8B',
    encoder_revision: 'pinned', pre_agg_embed_dim: 64, normalize_embeddings: false,
    projection_sha256: 'projection', probe_order_sha256: 'probes', probe_count: 100 };
function sample() {
    return { signature: Array(128).fill(1), metadata: { probe_count: 100,
        extractor_config: { ...expected, provenance: { encoder_revision: 'pinned' } } } };
}
describe('corrected DNA dataset coordinates', () => {
    it('accepts a matching signature', () => expect(validateCoordinateSystem(sample(), expected)).toEqual(expected));
    it.each(['encoder', 'projection_sha256', 'probe_order_sha256', 'normalize_embeddings'])(
        'rejects incompatible %s', (field) => {
            const dna = sample();
            (dna.metadata.extractor_config as Record<string, unknown>)[field] = 'different';
            expect(() => validateCoordinateSystem(dna, expected)).toThrow('Incompatible');
        });
    it('rejects legacy DNA', () => expect(() => validateCoordinateSystem({ signature: Array(128).fill(1), metadata: {} }, expected)).toThrow());
    it('rejects nonfinite and empty vectors', () => {
        const dna = sample(); dna.signature[0] = NaN;
        expect(() => validateCoordinateSystem(dna, expected)).toThrow();
        dna.signature = Array(128).fill(0);
        expect(() => validateCoordinateSystem(dna, expected)).toThrow();
    });
});
