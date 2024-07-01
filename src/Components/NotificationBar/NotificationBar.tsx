import { Snackbar } from "@mui/material";
import { useCallback, useMemo } from "react";
import { useAppStore } from "../../stores/store";
import { isEmpty } from "lodash";

function NotificationBar() {
  const notifications = useAppStore((state) => state.notifications);
  const closeNotification = useAppStore((state) => state.closeNotification);

  const { id, message } = useMemo(
    () => notifications[0] ?? {},
    [notifications]
  );

  const handleClose = useCallback(() => closeNotification(id), [id]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={!isEmpty(notifications)}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
    />
  );
}

export default NotificationBar;
