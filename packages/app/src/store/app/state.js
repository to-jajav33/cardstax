import icons from "../icons/state";
import htmlElementMap from "../htmlElementMap/state";

export default {
  icons,
  htmlElementMap,
  componentMap: {
    App: {
      componentName: "App",
      children: ["HomeView"],
      htmlList: []
    },
    HomeView: {
      componentName: "HomeView",
      children: [],
      htmlList: []
    }
  },
  routes: {
    HomeView: []
  },

  componentNameInputValue: "",
  projects: [{ filename: "Untitled-1", lastSavedLocation: "" }],
  activeRoute: "HomeView",
  activeComponent: "",
  selectedElementList: [],
  projectNumber: 2,
  activeTab: 0,
  componentChildrenMultiselectValue: [],
  modalOpen: false
};
