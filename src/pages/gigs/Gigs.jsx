import { useGetGigsQuery } from "../../features/gigs/gigsSlice";
import "./Gigs.scss";

const Gigs = () => {
  const {
    data: gigs,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetGigsQuery();

  console.log(gigs);

  return <div>Gigs</div>;
};
export default Gigs;
