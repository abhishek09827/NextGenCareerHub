import "./AddProject.css";

import { ethers } from "ethers";
import { useState, useEffect } from "react";
import Project from "../Project/Project";
// import ProjectDataFetcher from "../ProjectDataFetcher";

const AddProject = ({ onClose }) => {
  const [proImg, setProImg] = useState("");
  const { ethereum } = window;
  let [account, setAccount] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pictureLink, setPictureLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [allowContributions, setAllowContributions] = useState(false);
  const [domain, setDomain] = useState("");
  const [isDeployed, setIsDeployed] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchALL();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const connectMetamask = async () => {
    try {
      // Modern browsers
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        const selectedAccount = accounts[0];
        console.log("Connected to MetaMask. Account:", selectedAccount);
      } else {
        console.error("MetaMask is not installed!");
      }
    } catch (error) {
      console.error("Error connecting to MetaMask:", error.message);
    }
  };
  let contract;
  const connectContract = async () => {
    const Address = "0x350f1246bDcb60Dca95727E77F440Deede54a036";
    const ABI = [
      {
        inputs: [],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "projectOwner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "string",
            name: "title",
            type: "string",
          },
        ],
        name: "ProjectAdded",
        type: "event",
      },
      {
        inputs: [
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "pictureLink",
            type: "string",
          },
          {
            internalType: "string",
            name: "githubLink",
            type: "string",
          },
          {
            internalType: "bool",
            name: "allowContributions",
            type: "bool",
          },
          {
            internalType: "string",
            name: "domain",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isDeployed",
            type: "bool",
          },
        ],
        name: "addProject",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "projectOwner",
            type: "address",
          },
        ],
        name: "getAllProjects",
        outputs: [
          {
            components: [
              {
                internalType: "string",
                name: "title",
                type: "string",
              },
              {
                internalType: "string",
                name: "description",
                type: "string",
              },
              {
                internalType: "string",
                name: "pictureLink",
                type: "string",
              },
              {
                internalType: "string",
                name: "githubLink",
                type: "string",
              },
              {
                internalType: "bool",
                name: "allowContributions",
                type: "bool",
              },
              {
                internalType: "string",
                name: "domain",
                type: "string",
              },
              {
                internalType: "bool",
                name: "isDeployed",
                type: "bool",
              },
            ],
            internalType: "struct Project.ProjectData[]",
            name: "",
            type: "tuple[]",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "owner",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        name: "projects",
        outputs: [
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "string",
            name: "pictureLink",
            type: "string",
          },
          {
            internalType: "string",
            name: "githubLink",
            type: "string",
          },
          {
            internalType: "bool",
            name: "allowContributions",
            type: "bool",
          },
          {
            internalType: "string",
            name: "domain",
            type: "string",
          },
          {
            internalType: "bool",
            name: "isDeployed",
            type: "bool",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
    ];

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    contract = new ethers.Contract(Address, ABI, signer);

    console.log(contract.address);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      await contractWithSigner.addProject(
        title,
        description,
        pictureLink,
        githubLink,
        allowContributions,
        domain,
        isDeployed
      );

      console.log("Project added successfully!");
    } catch (error) {
      console.error("Error adding project:", error.message);
    }
  };

  const fetchALL = async (e) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log(contract);
      const contractWithSigner = contract.connect(signer);
      const data = await contractWithSigner.getAllProjects(
        "0x906AE658f4e996FAB721b9C2722276De5eDc056d"
      );
      console.log(data);
      console.log(data.title);
      setData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addpro-cont" tabIndex="-1" role="dialog">
      <div className="registerp">
        <form className="registerp-form">
          <div className="line-reg">
            <h1>Add a project</h1>
          </div>
          <div className="leftformpro">
            <div className="addpro-left">
              <label htmlFor="title">Project Title</label>
              <input
                name="title"
                type="text"
                placeholder="PROJECT"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="desc">Write Project Description</label>
              <textarea
                placeholder="A short description of your project"
                name="desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="10"
              ></textarea>
            </div>
            <div className="addpro-right">
              {" "}
              <label htmlFor="pictureLink">Project Picture</label>
              <input
                type="file"
                onChange={(e) => setPictureLink(e.target.files[0])}
              />
              <label htmlFor="githubLink">Github Link</label>
              <input
                name="githubLink"
                type="text"
                placeholder="Link"
                value={githubLink}
                onChange={(e) => setGithubLink(e.target.value)}
              />
              <div className="toggle">
                <label htmlFor="allowContributions">
                  Want People to contribute?
                </label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={allowContributions}
                    onChange={(e) => setAllowContributions(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <label htmlFor="domain">Select Your Project Domain</label>
              <select
                name="domain"
                id=""
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              >
                <option value="medical">Medical</option>
                <option value="fintech">Fintech</option>
                <option value="industry">Industry</option>
                <option value="environment">Environment</option>
              </select>
              <div className="toggle">
                <label htmlFor="isDeployed">Is it deployed?</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={isDeployed}
                    onChange={(e) => setIsDeployed(e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
              <button onClick={handleSubmit}>Save and Add</button>
            </div>
          </div>
        </form>

        <div className="but-addpro">
          {" "}
          <button onClick={connectMetamask} className="form-add-but">
            Connect To MetaMask
          </button>
          <button onClick={connectContract} className="form-add-but">
            Initiate Contract
          </button>
        </div>
      </div>
      {/* <ProjectDataFetcher contract={contract} account={account} /> */}
      <button onClick={fetchALL} className="pro-but-fet">
        See Project
      </button>
      <div className="see-pro-cont" style={{ width: "100%" }}>
        <Project data={data} />
      </div>
    </div>
  );
};

export default AddProject;
