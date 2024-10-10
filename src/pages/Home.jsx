import BannerProduct from '../componets/BannerProduct';
import CategoryList from '../componets/CategoryList';
import HorizontalCartProduct from '../componets/HorizontalCartProduct';

function Home() {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <HorizontalCartProduct category={'airpods'} heading={'Top airpods'} />
      <HorizontalCartProduct category={'camera'} heading={'Top cameras'} />
    </div>
  );
}

export default Home;
