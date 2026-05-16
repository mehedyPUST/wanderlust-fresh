"use client";

import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";





export function DeleteAlert({ destination }) {
    const { _id, destinationName } = destination;
    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/destination/${_id}`,
            {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json"
                }
            }
        );

        const data = await res.json()
        redirect('/destinations')
        console.log(data)
    }
    return (
        <AlertDialog>
            <AlertDialog.Trigger className="group flex items-center gap-3 rounded-2xl bg-surface p-4 shadow-xs select-none hover:bg-surface-secondary">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-danger-soft text-danger-soft-foreground">
                    <TrashBin className="size-6" />
                </div>
                <div className="flex flex-1 flex-col gap-0.5">
                    <p className="text-sm font-semibold">Delete Item</p>
                    <p className="text-xs text-muted">Permanently remove this item</p>
                </div>
            </AlertDialog.Trigger>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger">
                                <TrashBin className="size-5" />
                            </AlertDialog.Icon>
                            <AlertDialog.Heading>Delete this item?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                Use <code>AlertDialog.Trigger</code> to create custom trigger elements beyond
                                standard buttons. This example shows a card-style trigger with icons and descriptive
                                text.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} slot="close" variant="danger">
                                Delete Item
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}