import BannerProduct from '../componets/BannerProduct';
import CategoryList from '../componets/CategoryList';
import HorizontalCartProduct from '../componets/HorizontalCartProduct';
import VerticalCardProduct from '../componets/VerticalCardProduct';

function Home() {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCartProduct category={'airpods'} heading={'Top airpods'} />
      <HorizontalCartProduct category={'camera'} heading={'Popular cameras'} />
      <VerticalCardProduct category={'earphones'} heading={'earphones'} />
      <VerticalCardProduct category={'mouse'} heading={'mouse'} />
      <VerticalCardProduct category={'speaker'} heading={'speaker'} />
    </div>
  );
}

export default Home;
