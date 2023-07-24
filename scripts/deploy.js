async function main() {
  const contractAddress = await ethers.deployContract("Candidates");
  console.log("Token address:", await contractAddress.getAddress());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
