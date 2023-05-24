export default function () {
  const router = useRoute();
  let statusHeader = useState("statusHeader", () => false);
  if (router.path !== "/") {
    statusHeader.value = true;
  }
  if (router.path === "/") {
    if (process.client) {
      let position = window.pageYOffset;
      window.addEventListener("scroll", () => {
        let scroll = window.pageYOffset;
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
