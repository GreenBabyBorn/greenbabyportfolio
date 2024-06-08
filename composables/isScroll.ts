export default function () {
  const router = useRoute();
  let statusHeader = useState("statusHeader", () => false);
  if (router.path !== "/") {
    statusHeader.value = true;
  }
  if (router.path === "/") {
    if (process.client) {
      let position = window.scrollY;
      window.addEventListener("scroll", () => {
        let scroll = window.scrollY;
        scroll > position
          ? (statusHeader.value = false)
          : (statusHeader.value = false);

        position = scroll;
        statusHeader.value = true;
      });
    }
  }

  return statusHeader;
}
