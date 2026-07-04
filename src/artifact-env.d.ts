/** Compile-time flag: true only in the single-file offline "artifact" build
 * (see vite.artifact.config.ts), false in the normal app. Lets bundlers dead-
 * code-eliminate the network-fetch branches from the artifact build and the
 * embedded-data branches from the normal build. */
declare const __ARTIFACT__: boolean;
