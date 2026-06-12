function brokenDemo() {
  const message = "This should fail lint or build";
  if (message) {
    console.log(message);
  }
}
  // Missing closing brace intentionally
