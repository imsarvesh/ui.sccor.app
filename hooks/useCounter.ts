import { gql } from "@apollo/client";
import { useSubscription } from "@apollo/client/react";

const useCounter = () => {
  return useSubscription(gql`
    subscription {
      counter
    }
  `);
};

export default useCounter;
