import React from "react";
// import FormPeer from "./FormPeer";
// import OutputForm from "./OutputForm";
import { Provider as AddPeerProvider } from "./contexts/AddPeer";
import { Provider as StepProvider } from "./contexts/Step";

const FormPeer = React.lazy(() => import("./FormPeer"))
const OutputForm = React.lazy(() => import("./OutputForm"))
function FormFeedback() {
  const [peers, setPeers] = React.useState([]);
  const [step, setStep] = React.useState(0);

  function addPeer(peer) {
    setStep(step + 1);
    setPeers([...peers, { id: peers.length, ...peer }]);
  }

  return (
    <AddPeerProvider value={addPeer}>
      <h1>Feedback Form</h1>
      <React.Suspense fallback={<p>Estoy cargando</p>}>
        {step < 3 ? (
          <>
            <h2>Form: {step + 1}</h2>
            <StepProvider value={step}>
              <FormPeer />
            </StepProvider>
          </>
        ) : (
          <OutputForm peers={peers} />
        )}
      </React.Suspense>
    </AddPeerProvider>
  );
}

export default FormFeedback;
