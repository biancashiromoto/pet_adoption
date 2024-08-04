import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const useNavigationBlocker = (hasChanged: boolean) => {
  const [showModal, setShowModal] = useState(false);
  const [nextPath, setNextPath] = useState<string | null>(null);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const unblock = history.block((nextLocation) => {
      if (hasChanged && nextLocation.pathname !== location.pathname) {
        setNextPath(nextLocation.pathname);
        setShowModal(true);
        return false;
      }
      return true;
    });

    return () => {
      unblock();
    };
  }, [hasChanged, history, location.pathname]);

  const handleConfirmNavigation = () => {
    setShowModal(false);
    if (nextPath) {
      history.push(nextPath);
      setNextPath(null);
    }
  };

  const handleCancelNavigation = () => {
    setShowModal(false);
    setNextPath(null);
  };

  const handleDirectNavigation = (path: string) => {
    const unblock = history.block(() => true);
    history.push(path);
    unblock();
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
