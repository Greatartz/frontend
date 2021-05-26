import { Link } from "@material-ui/core";

export default function Plane({ name, priceId, productId, desc, cost, image }) {
  return (
    <div className="obj1 md:flex md:border md:border-solid md:border-black md:p-4">
      <img src={image} className="h-auto w-48 md:mx-2" />
      <div>
        <h2>{name}</h2>
        <p>{desc}</p>
        <p>Cost: {cost} </p>
        <div className="my-2">
          <Link href={`subscriptions/${productId}`}>
            <a
              className="px-5 py-3 rounded-lg shadow-lg bg-indigo-500 
        text-white uppercase tracking-wider font-semibold text-sm sm:text-base"
              onClick={() => handlePayment(priceId)}
            >
              Subscribe Now!
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
