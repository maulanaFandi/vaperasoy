const Header = () => {
    const [pageTitle, setPageTitle] = useState("Vaporasoy | CMS");
  
    useEffect(() => {
      // Set judul halaman berdasarkan rute yang aktif
      const handleSetTitle = () => {
        const currentRoute = router.matchRoute(window.location.pathname);
        if (currentRoute) {
          setPageTitle(`${pageTitle} - ${currentRoute.title}`);
        }
      };
  
      // Panggil fungsi untuk menetapkan judul halaman saat komponen dimuat
      handleSetTitle();
  
      // Tambahkan event listener untuk memperbarui judul halaman saat rute berubah
      window.addEventListener("popstate", handleSetTitle);
  
      // Bersihkan event listener saat komponen di-unmount
      return () => {
        window.removeEventListener("popstate", handleSetTitle);
      };
    }, []);
  
    return (
      <>
        <title>{pageTitle}</title>
        {router.render()}
      </>
    );
  };
  
  export default Header;