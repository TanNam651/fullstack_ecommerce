import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Product} from "@/pages/admin/orders/orderId/components/order-form.tsx";
import React from "react";

interface TableProductProps{
  items:Product[],
}

export const TableProduct:React.FC<TableProductProps> = ({
  items
                                                         })=>{
  return(
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="hover-none">
            <TableHead className="visually-hidden">Image</TableHead>
            <TableHead className="visually-hidden">Description</TableHead>
            <TableHead className="visually-hidden">Quantity</TableHead>
            <TableHead className="visually-hidden">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((product)=>(
            <TableRow className="hover-none">
              <TableCell>
                <div className="relative rounded-md w-[5em] h-[5em] p-1 after:content-[''] after:absolute after:top-0 after:left-0 after:bottom-0 after:right-0 after:rounded-md after:ring after:ring-primary/15">
                  <div className="w-full h-full overflow-hidden relative rounded-md">
                    <img src={product.imageUrl} alt={product.name}/>
                  </div>
                  <span
                    aria-hidden={true}
                    className="text-[0.85715em] font-bold bg-primary/30 text-primary-foreground absolute top-[-0.75em] right-[-0.75em] z-2 py-[0.15em] px-[0.65em] rounded-full"
                  >{product.quantity}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <span className="whitespace-normal break-words max-w-sm text-base">
                  {product.name}
                </span>
              </TableCell>
              <TableCell className="visually-hidden">{product.quantity}</TableCell>
              <TableCell>
                <span className="text-base font-semibold ">{product.price}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}