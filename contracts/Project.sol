// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Project {
    struct ProjectData{
        string title;
        string description;
        string pictureLink;
        string githubLink;
        bool allowContributions;
        string domain;
        bool isDeployed;
    }

    address public owner;
    mapping(address => ProjectData) public projects;

    event ProjectAdded(address indexed projectOwner, string title);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function getAllProjects(address projectOwner) public view returns (ProjectData[] memory) {
    ProjectData[] memory allProjects = new ProjectData[](1);
    allProjects[0] = projects[projectOwner];
    return allProjects;
    }

    function addProject(
        string memory title,
        string memory description,
        string memory pictureLink,
        string memory githubLink,
        bool allowContributions,
        string memory domain,
        bool isDeployed
    ) external {
        require(bytes(title).length > 0, "Title cannot be empty");
        require(bytes(description).length > 0, "Description cannot be empty");

    

        projects[msg.sender] = ProjectData({
            title: title,
            description: description,
            pictureLink: pictureLink,
            githubLink: githubLink,
            allowContributions: allowContributions,
            domain: domain,
            isDeployed: isDeployed
        });

        emit ProjectAdded(msg.sender, title);
    }
}
