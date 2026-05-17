
"use client";

import { authClient } from "@/lib/auth-client";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useState } from "react";
import { BiEdit, BiUser } from "react-icons/bi";
import { MdImage, MdPerson } from "react-icons/md";

export function UpdateUserModal() {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const name = e.target.name.value;
        const image = e.target.image.value;

        try {
            await authClient.updateUser({
                name,
                image
            });
            // Close modal on success (you might want to add a ref for this)
        } catch (error) {
            console.error("Update failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal>
            <Button variant="flat" className="bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold hover:from-amber-700 hover:to-orange-600 transition-all hover:scale-105 shadow-md w-full">
                <BiEdit size={18} /> Update Profile
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md border border-amber-100">
                        <Modal.CloseTrigger />
                        <Modal.Header className="border-b border-amber-100">
                            <Modal.Icon className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-600 p-2 rounded-lg">
                                <BiUser className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                                Update Profile
                            </Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default" className="bg-white">
                                <form onSubmit={onSubmit} className="flex flex-col gap-4">
                                    <div className="w-full">
                                        <Label className="text-gray-700 font-semibold block mb-2">Name</Label>
                                        <div className="relative">
                                            <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                name="name"
                                                type="text"
                                                placeholder="Enter your name"
                                                className="pl-10 border-amber-100 focus:border-amber-400 w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="w-full">
                                        <Label className="text-gray-700 font-semibold block mb-2">Profile Image URL</Label>
                                        <div className="relative">
                                            <MdImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                name="image"
                                                type="url"
                                                placeholder="https://example.com/avatar.jpg"
                                                className="pl-10 border-amber-100 focus:border-amber-400 w-full"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-3 justify-end mt-4 pt-2 border-t border-amber-100">
                                        <Button
                                            slot="close"
                                            variant="flat"
                                            className="border border-amber-200 text-gray-600 hover:bg-amber-50"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            slot="close"
                                            isLoading={isLoading}
                                            className="bg-gradient-to-r from-amber-600 to-orange-500 text-white font-semibold hover:from-amber-700 hover:to-orange-600 transition-all shadow-md"
                                        >
                                            Update Profile
                                        </Button>
                                    </div>
                                </form>
                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}