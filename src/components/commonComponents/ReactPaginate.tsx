import ReactPaginate from 'react-paginate';

const ReactPaginateItems = ({ itemsPerPage, setItemOffset, items }: any) => {
    const pageCount = Math.ceil(items?.length / itemsPerPage);
    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items?.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    return (
        <ReactPaginate
            disabledClassName="[&>a]:text-[#e6e6e6]"
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            breakClassName="break-me"
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            breakLinkClassName="relative block py-2 px-3 -ml-0.5 leading-tight text-black bg-white rounded-lg border border-[#dee2e6] hover:cursor-pointer hover:bg-[#dee2e6]"
            containerClassName="flex justify-center pl-0 list-none pt-5 rounded-sm"
            pageClassName="[&.active>a]:bg-blue-300 mr-2"
            pageLinkClassName="relative block py-2 px-3 -ml-0.5 leading-tight text-black bg-white rounded-lg border border-[#dee2e6] hover:cursor-pointer hover:bg-[#dee2e6]"
            previousClassName="[&.active>a]:bg-blue-300 mr-2"
            previousLinkClassName="relative block py-2 px-3 -ml-0.5 leading-tight text-black bg-white rounded-lg border border-[#dee2e6] hover:cursor-pointer hover:bg-[#dee2e6]"
            nextClassName="[&.active>a]:bg-blue-300"
            nextLinkClassName="relative block py-2 px-3 -ml-0.5 leading-tight text-black bg-white rounded-lg border border-[#dee2e6] hover:cursor-pointer hover:bg-[#dee2e6]"
            activeClassName="active"
        />
    );
}

export default ReactPaginateItems;