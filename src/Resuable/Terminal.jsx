import styled from "styled-components";

const TerminalContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: black;
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
`;

const TerminalContent = styled.div`
  margin-top: 10px;
`;

const TerminalDivision = () => {
  return (
    <TerminalContainer>
      <TerminalHeader>
        <span>Mac Terminal</span>
        <span>Close</span>
      </TerminalHeader>
      <TerminalContent>
        <p>
          Welcome to the job recruitment site terminal. Here you can find
          information about available jobs, apply for positions, and manage your
          job applications.
        </p>
        {/* Add more content related to the job recruitment site */}
      </TerminalContent>
    </TerminalContainer>
  );
};

export default TerminalDivision;
