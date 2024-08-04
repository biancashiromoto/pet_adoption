import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

/**
 * Custom hook to manage navigation blocking and modal confirmation
 * when unsaved changes are detected.
 *
 * @param hasChanged - Boolean indicating whether there are unsaved changes.
 * @returns An object containing state and functions to handle navigation and modal.
 */
export const useNavigationBlocker = (hasChanged: boolean) => {
  const [showModal, setShowModal] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    /**
     * Block navigation and show a modal if there are unsaved changes.
     * When navigation is attempted, check if there are unsaved changes and
     * if the path is different from the current one. If so, show the modal.
     *
     * @param nextLocation - The location object of the attempted navigation.
     * @returns `false` to prevent navigation or `true` to allow it.
     */
    const unblock = history.block((nextLocation) => {
      if (hasChanged && nextLocation.pathname !== location.pathname) {
        setNextPath(nextLocation.pathname);
        setShowModal(true);
        return false; // Prevent navigation and show modal
      }
      return true; // Allow navigation
    });

    // Cleanup function to unblock navigation when the component unmounts or dependencies change
    return () => {
      unblock();
    };
  }, [hasChanged, history, location.pathname]);

  /**
   * Confirm navigation and proceed to the next path.
   * Hide the modal and navigate to the path stored in `nextPath`.
   */
  const handleConfirmNavigation = () => {
    setShowModal(false);
    if (nextPath) {
      history.push(nextPath); // Navigate to the stored path
      setNextPath(null);
    }
  };

  /**
   * Cancel navigation and close the modal.
   * Does not change the current navigation state.
   */
  const handleCancelNavigation = () => {
    setShowModal(false);
    setNextPath(null); // Clear the stored path
  };

  /**
   * Directly navigate to the specified path without blocking.
   * Unblock any previous navigation blockers and navigate to the new path.
   *
   * @param path - The path to navigate to.
   */
  const handleDirectNavigation = (path: string) => {
    const unblock = history.block(() => true); // Unblock any previous navigation blockers
    history.push(path); // Navigate to the new path
    unblock(); // Immediately unblock to prevent blocking future navigation
    setNextPath(null);
  };

  return {
    showModal,
    setShowModal,
    handleConfirmNavigation,
    handleCancelNavigation,
    handleDirectNavigation,
  };
}
