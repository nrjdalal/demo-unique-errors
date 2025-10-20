"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { GalleryVerticalEnd } from "lucide-react"
import * as z from "zod"

const formSchema = z.object({
  email: z.email({ message: "Please enter a valid email address." }),
})

export default function Component() {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
      onChange: formSchema,
      onBlur: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log(value)
      form.reset()
    },
  })

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-24 cursor-pointer" size="sm" variant="outline">
          Login
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-w-md sm:max-w-md"
        tabIndex={-1}
        onOpenAutoFocus={(event) => {
          event.preventDefault()
        }}
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="text-center">Sign in/up</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-col items-center gap-2 font-medium">
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">ACME Inc.</span>
            </div>
            <h1 className="text-xl font-semibold">Welcome to ACME Inc.</h1>
          </div>
          <form
            id="email"
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              form.handleSubmit()
            }}
          >
            {/* Email w/o unique errors */}
            <FieldGroup>
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email w/o unique errors
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="email"
                        name={field.name}
                        className="focus:placeholder:opacity-0"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="admin@nrjdalal.com"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>
            {/* Email with unique errors */}
            <FieldGroup>
              <form.Field name="email">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Email with unique errors
                      </FieldLabel>
                      <Input
                        id={field.name}
                        type="email"
                        name={field.name}
                        className="focus:placeholder:opacity-0"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="admin@nrjdalal.com"
                      />
                      {isInvalid && (
                        <FieldError
                          errors={[
                            ...new Map(
                              field.state.meta.errors.map((error) => [
                                error?.message,
                                error,
                              ]),
                            ).values(),
                          ]}
                        />
                      )}
                    </Field>
                  )
                }}
              </form.Field>
            </FieldGroup>
            <Button
              form="email"
              type="submit"
              variant="secondary"
              className="w-full cursor-pointer"
            >
              Sign in/up
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
