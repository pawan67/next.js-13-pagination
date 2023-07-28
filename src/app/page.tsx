import PaginationControls from "@/components/PaginationControls";

import { fetchData } from "@/lib/api";
import { ProductList } from "@/lib/type";
import { FC } from "react";

interface HomeProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home: FC<HomeProps> = async ({ searchParams }) => {
  const skip = searchParams["skip"] ?? "0";
  const limit = searchParams["limit"] ?? "10";

  const data: ProductList = await fetchData(skip as string, limit as string);

  const hasNextPage = data["skip"] + data["limit"] < data["total"];
  const hasPrevPage = data["skip"] > 0;

  return (
    <div>
      <h1 className=" text-2xl font-semibold my-5">
        Pagination Example Next JS 13
      </h1>
      <div className=" grid mb-5 gap-3 grid-cols-2 ">
        {data.products.map((product) => {
          return (
            <div
              key={product.id}
              className=" border rounded-lg  p-3 flex flex-col gap-3"
            >
              <h2 className=" font-semibold">{product.title}</h2>
              <p className=" text-sm line-clamp-1 text-muted-foreground">
                {product.description}
              </p>
            </div>
          );
        })}
      </div>

      <PaginationControls
        total={data["total"]}
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
      />
    </div>
  );
};

export default Home;
