const TodoLoading: React.FC = () => {
  return (
    <div className="h-42 w-2/5 border bg-white px-2 shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex h-8 w-full flex-row items-center justify-between pt-2">
          <div
            className="flex h-[24px] w-[64px] flex-row items-center justify-center rounded-full px-2 py-1 bg-gray-200 animate-pulse"
          >
          </div>
          <div className="flex h-[24px] w-[64px] rounded-full flex-row items-center justify-center gap-1 px-2 py-1 bg-gray-200 animate-pulse">

          </div>
        </div>
        <div className="flex h-16 w-full flex-col justify-start px-2 gap-4">
        <div className="flex flex-row gap-1 h-[16px] w-5/5 bg-gray-200 animate-pulse rounded-full">
          </div>
          <div className="flex flex-row gap-1 h-[16px] w-4/5 bg-gray-200 animate-pulse rounded-full">
          </div>
        </div>
        <div className="flex h-12 w-full flex-row items-center justify-between px-2">
          <div className="flex flex-row gap-1 h-[36px] w-[106px] bg-gray-200 animate-pulse rounded-full">
          </div>
          <div className="flex flex-row gap-1 h-[36px] w-[64pxpx] bg-gray-200 animate-pulse rounded-full">
          </div>
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="h-8 w-8 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoLoading;
