
import '../styles/Info.css'; 
const Info = () => {
    return (
      <div className="info-wrapper">  {/* Ny wrapper för att separera styling */}
      

  <div className="info-container">
    <h1>Välkommen!</h1>
    <p>Jag heter Gabriella Broberg, frontend-utvecklare under utbildning. Denna app är en prototyp skapad av mig i undervisningssyfte. Teknikerna som används är React, React Router för navigering, och Redux för tillståndshantering.</p>
    <p>Utforska gärna min <a href="https://gabriellabroberg.se" target="_blank">portfolio</a> för att lära känna mig bättre och se fler av mina projekt.</p>
</div>

  

      </div>
    );
  };
  
  export default Info;