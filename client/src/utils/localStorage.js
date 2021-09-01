export const getSavedrouteIds = () => {
  const savedrouteIds = localStorage.getItem("saved_routes")
    ? JSON.parse(localStorage.getItem("saved_routes"))
    : [];

  return savedrouteIds;
};

export const saverouteIds = (routeIdArr) => {
  if (routeIdArr.length) {
    localStorage.setItem("saved_routes", JSON.stringify(routeIdArr));
  } else {
    localStorage.removeItem("saved_routes");
  }
};

export const removeRouteId = (routeId) => {
  const savedrouteIds = localStorage.getItem("saved_routes")
    ? JSON.parse(localStorage.getItem("saved_routes"))
    : null;

  if (!savedrouteIds) {
    return false;
  }

  const updatedSavedrouteIds = savedrouteIds?.filter(
    (savedrouteId) => savedrouteId !== routeId
  );
  localStorage.setItem("saved_routes", JSON.stringify(updatedSavedrouteIds));

  return true;
};
