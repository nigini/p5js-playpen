import chroma from "./chroma.mjs"

console.log("Test chroma!", chroma('hotpink').darken().hex());

export default chroma;
