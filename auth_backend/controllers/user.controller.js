import { ErrorHandler } from "../utils/ErrorHandler.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { clerkClient, getAuth } from "@clerk/express";

export const getUserDetails = asyncHandler(async (req, res) => {
  try {
    const { userId } = getAuth(req);
    const clerkUser = await clerkClient.users.getUser(userId);
    if (!clerkUser) return next(new ErrorHandler(404, "Clerk user not found" ));

    const primaryEmail = clerkUser.emailAddresses.find(
      (e) => e.id === clerkUser.primaryEmailAddressId
    )?.emailAddress || null;

    const userDetails = {
      id: clerkUser.id,
      firstName: clerkUser.firstName,
      lastName: clerkUser.lastName,
      email: primaryEmail,
      imageUrl: clerkUser.imageUrl,
      publicMetadata: clerkUser.publicMetadata,
      unsafeMetadata: clerkUser.unsafeMetadata,
    };

    res.status(200).json({ success: true, user: userDetails });
  } catch (error) {
    console.error("Clerk fetch error:", error);
    return next(new ErrorHandler(500, "Failed to fetch user details from Clerk"));
  }
});