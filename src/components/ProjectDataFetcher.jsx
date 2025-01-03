import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const ProjectDataFetcher = ({ contract, account }) => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    pictureLink: "",
    githubLink: "",
    allowContributions: false,
    domain: "",
    isDeployed: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      useEffect(() => {
        const fetchData = async () => {
          try {
            // Check if contract and account are present
            if (contract && account) {
              // Connect to the Ethereum network
              const provider = new ethers.providers.Web3Provider(
                window.ethereum
              );
              const contractWithSigner = contract.connect(provider.getSigner());

              // Fetch project data based on the Ethereum account address
              const data = await contractWithSigner.projects(account);

              // Update state with the fetched data
              setProjectData({
                title: data.title,
                description: data.description,
                pictureLink: data.pictureLink,
                githubLink: data.githubLink,
                allowContributions: data.allowContributions,
                domain: data.domain,
                isDeployed: data.isDeployed,
              });
            }
          } catch (error) {
            console.error("Error fetching project data:", error.message);
          }
        };

        // Fetch data whenever the contract or account changes
        fetchData();
      }, [contract, account]);
    };
  });

  return (
    <div>
      <h2>Project Data</h2>
      <p>Title: {projectData.title}</p>
      <p>Description: {projectData.description}</p>
      <p>Picture Link: {projectData.pictureLink}</p>
      <p>Github Link: {projectData.githubLink}</p>
      <p>Allow Contributions: {projectData.allowContributions.toString()}</p>
      <p>Domain: {projectData.domain}</p>
      <p>Is Deployed: {projectData.isDeployed.toString()}</p>
    </div>
  );
};

export default ProjectDataFetcher;
