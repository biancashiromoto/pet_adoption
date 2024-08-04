import { ChangeEvent, useState } from "react";

// Define the structure of the form state using an interface
interface FormProps {
  pet: {
    name: string;
    species: "" | "Canine" | "Feline";
  },
  tutor: {
    firstName: string;
    lastName: string;
  }
}

// Custom hook to manage form state and handle changes
export const useForm = (setHasChanged: React.Dispatch<React.SetStateAction<boolean>>) => {
  // Initialize form state with default values
  const [form, setForm] = useState<FormProps>({
    pet: {
      name: "",
      species: ""
    },
    tutor: {
      firstName: "",
      lastName: ""
    }
  });

  // Handle changes to input/select elements in the form
  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    const section = name.split(".")[0]; // e.g., "pet" or "tutor"
    const field = name.split(".")[1]; // e.g., "name" or "firstName"

    // Update form state by setting the appropriate value
    setForm((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section as keyof FormProps],
        [field]: value,
      },
    }));

    // Mark the form as having been changed
    setHasChanged(true);
  };

  // Return the form state and the handleChange function
  return {
    form,
    handleChange
  };
}
