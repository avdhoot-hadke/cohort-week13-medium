export default function PostCard({
  heading,
  content,
  img,
  author,
  createdAt,
}: {
  heading: string;
  content: string;
  img: string;
  author: string;
  createdAt: string;
}) {
  const date = new Date(createdAt);

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  createdAt = `${month} ${day}, ${year}`;

  return (
    <div className="flex flex-col my-12 items-center md:px-12 lg:px-56  md:flex-row md:justify-around hover:shadow-none ">
      <div className="p-5  md:p-0 md:w-1/2 ">
        <div className="flex py-2 items-center ">
          <div className=" inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {author[0]}
            </span>
          </div>
          <p className="ms-2">{author}</p>
          <span className="text-[3px] mx-2">&#9679;</span>
          <p className="font-thin text-sm ">{createdAt}</p>
        </div>
        <h4 className="py-2 font-bold  md:text-2xl cursor-pointer">
          {heading}
        </h4>
        <p className="line-clamp-2 cursor-pointer">{content}</p>
        <p className="pt-4 font-thin text-sm">{`${Math.ceil(
          content.length / 100
        )} minutes read`}</p>
      </div>
      <img
        className=" pt-0  h-48 rounded object-cover w-48 cursor-pointer"
        alt="image"
        src={img}
      />
    </div>
  );
}

export function PostCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col my-12 items-center md:px-12 lg:px-56  md:flex-row md:justify-around hover:shadow-none ">
      <div className="p-5  md:p-0 md:w-1/2 ">
        <div className="flex my-2 items-center ">
          <div className=" inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-neutral-300 rounded-full "></div>
          <div className="ms-2 h-4 w-1/4 bg-neutral-300">{}</div>
        </div>
        <div className="my-4 h-6 w-2/3 bg-neutral-300"></div>
        <div className="mt-1 bg-neutral-300 h-4 w-full"></div>
        <div className="mt-1 bg-neutral-300 h-4 w-full"></div>
        <div className="mt-1 bg-neutral-300 h-4 w-full"></div>
      </div>
      <div className="bg-neutral-300 pt-0 h-48 rounded object-cover w-48 cursor-pointer"></div>
    </div>
  );
}
