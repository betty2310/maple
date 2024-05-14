<script lang="ts" setup>
import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle
} from 'lucide-vue-next'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
</script>

<template>
  <div class="grid h-screen w-full pl-[53px]">
    <aside class="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
      <div class="border-b p-2">
        <Button aria-label="Home" size="icon" variant="outline">
          <Triangle class="size-5 fill-foreground" />
        </Button>
      </div>
      <nav class="grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                aria-label="Playground"
                class="rounded-lg bg-muted"
                size="icon"
                variant="ghost"
              >
                <SquareTerminal class="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent :side-offset="5" side="right">
              Playground
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                aria-label="Models"
                class="rounded-lg"
                size="icon"
                variant="ghost"
              >
                <Bot class="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent :side-offset="5" side="right">
              Models
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                aria-label="API"
                class="rounded-lg"
                size="icon"
                variant="ghost"
              >
                <Code2 class="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent :side-offset="5" side="right">
              API
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                aria-label="Documentation"
                class="rounded-lg"
                size="icon"
                variant="ghost"
              >
                <Book class="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent :side-offset="5" side="right">
              Documentation
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                aria-label="Settings"
                class="rounded-lg"
                size="icon"
                variant="ghost"
              >
                <Settings2 class="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent :side-offset="5" side="right">
              Settings
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

      </nav>
      <nav class="mt-auto grid gap-1 p-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                aria-label="Help"
                class="mt-auto rounded-lg"
                size="icon"
                variant="ghost"
              >
                <LifeBuoy class="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent :side-offset="5" side="right">
              Help
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger as-child>
              <Button
                aria-label="Account"
                class="mt-auto rounded-lg"
                size="icon"
                variant="ghost"
              >
                <SquareUser class="size-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent :side-offset="5" side="right">
              Account
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
    <div class="flex flex-col">
      <header class="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
        <h1 class="text-xl font-semibold">
          Playground
        </h1>
        <Drawer>
          <DrawerTrigger as-child>
            <Button class="md:hidden" size="icon" variant="ghost">
              <Settings class="size-4" />
              <span class="sr-only">Settings</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent class="max-h-[80vh]">
            <DrawerHeader>
              <DrawerTitle>Configuration</DrawerTitle>
              <DrawerDescription>
                Configure the settings for the model and messages.
              </DrawerDescription>
            </DrawerHeader>
            <form class="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
              <fieldset class="grid gap-6 rounded-lg border p-4">
                <legend class="-ml-1 px-1 text-sm font-medium">
                  Settings
                </legend>
                <div class="grid gap-3">
                  <Label for="model">Model</Label>
                  <Select>
                    <SelectTrigger
                      id="model"
                      class="items-start [&_[data-description]]:hidden"
                    >
                      <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="genesis">
                        <div class="flex items-start gap-3 text-muted-foreground">
                          <Rabbit class="size-5" />
                          <div class="grid gap-0.5">
                            <p>
                              Neural
                              <span class="font-medium text-foreground">
                                Genesis
                              </span>
                            </p>
                            <p class="text-xs" data-description>
                              Our fastest model for general use cases.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="explorer">
                        <div class="flex items-start gap-3 text-muted-foreground">
                          <Bird class="size-5" />
                          <div class="grid gap-0.5">
                            <p>
                              Neural
                              <span class="font-medium text-foreground">
                                Explorer
                              </span>
                            </p>
                            <p class="text-xs" data-description>
                              Performance and speed for efficiency.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                      <SelectItem value="quantum">
                        <div class="flex items-start gap-3 text-muted-foreground">
                          <Turtle class="size-5" />
                          <div class="grid gap-0.5">
                            <p>
                              Neural
                              <span class="font-medium text-foreground">
                                Quantum
                              </span>
                            </p>
                            <p class="text-xs" data-description>
                              The most powerful model for complex
                              computations.
                            </p>
                          </div>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="grid gap-3">
                  <Label for="temperature">Temperature</Label>
                  <Input id="temperature" placeholder="0.4" type="number" />
                </div>
                <div class="grid gap-3">
                  <Label for="top-p">Top P</Label>
                  <Input id="top-p" placeholder="0.7" type="number" />
                </div>
                <div class="grid gap-3">
                  <Label for="top-k">Top K</Label>
                  <Input id="top-k" placeholder="0.0" type="number" />
                </div>
              </fieldset>
              <fieldset class="grid gap-6 rounded-lg border p-4">
                <legend class="-ml-1 px-1 text-sm font-medium">
                  Messages
                </legend>
                <div class="grid gap-3">
                  <Label for="role">Role</Label>
                  <Select default-value="system">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="system">
                        System
                      </SelectItem>
                      <SelectItem value="user">
                        User
                      </SelectItem>
                      <SelectItem value="assistant">
                        Assistant
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="grid gap-3">
                  <Label for="content">Content</Label>
                  <Textarea id="content" placeholder="You are a..." />
                </div>
              </fieldset>
            </form>
          </DrawerContent>
        </Drawer>
        <Button
          class="ml-auto gap-1.5 text-sm"
          size="sm"
          variant="outline"
        >
          <Share class="size-3.5" />
          Share
        </Button>
      </header>
      <main class="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
        <div class="relative hidden flex-col items-start gap-8 md:flex">
          <form class="grid w-full items-start gap-6">
            <fieldset class="grid gap-6 rounded-lg border p-4">
              <legend class="-ml-1 px-1 text-sm font-medium">
                Settings
              </legend>
              <div class="grid gap-3">
                <Label for="model">Model</Label>
                <Select>
                  <SelectTrigger
                    id="model"
                    class="items-start [&_[data-description]]:hidden"
                  >
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="genesis">
                      <div class="flex items-start gap-3 text-muted-foreground">
                        <Rabbit class="size-5" />
                        <div class="grid gap-0.5">
                          <p>
                            Neural
                            <span class="font-medium text-foreground">
                              Genesis
                            </span>
                          </p>
                          <p class="text-xs" data-description>
                            Our fastest model for general use cases.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="explorer">
                      <div class="flex items-start gap-3 text-muted-foreground">
                        <Bird class="size-5" />
                        <div class="grid gap-0.5">
                          <p>
                            Neural
                            <span class="font-medium text-foreground">
                              Explorer
                            </span>
                          </p>
                          <p class="text-xs" data-description>
                            Performance and speed for efficiency.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                    <SelectItem value="quantum">
                      <div class="flex items-start gap-3 text-muted-foreground">
                        <Turtle class="size-5" />
                        <div class="grid gap-0.5">
                          <p>
                            Neural
                            <span class="font-medium text-foreground">
                              Quantum
                            </span>
                          </p>
                          <p class="text-xs" data-description>
                            The most powerful model for complex computations.
                          </p>
                        </div>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid gap-3">
                <Label for="temperature">Temperature</Label>
                <Input id="temperature" placeholder="0.4" type="number" />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="grid gap-3">
                  <Label for="top-p">Top P</Label>
                  <Input id="top-p" placeholder="0.7" type="number" />
                </div>
                <div class="grid gap-3">
                  <Label for="top-k">Top K</Label>
                  <Input id="top-k" placeholder="0.0" type="number" />
                </div>
              </div>
            </fieldset>
            <fieldset class="grid gap-6 rounded-lg border p-4">
              <legend class="-ml-1 px-1 text-sm font-medium">
                Messages
              </legend>
              <div class="grid gap-3">
                <Label for="role">Role</Label>
                <Select default-value="system">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="system">
                      System
                    </SelectItem>
                    <SelectItem value="user">
                      User
                    </SelectItem>
                    <SelectItem value="assistant">
                      Assistant
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div class="grid gap-3">
                <Label for="content">Content</Label>
                <Textarea
                  id="content"
                  class="min-h-[9.5rem]"
                  placeholder="You are a..."
                />
              </div>
            </fieldset>
          </form>
        </div>
        <div class="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
          <Badge class="absolute right-3 top-3" variant="outline">
            Output
          </Badge>
          <div class="flex-1" />
          <form
            class="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring">
            <Label class="sr-only" for="message">
              Message
            </Label>
            <Textarea
              id="message"
              class="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
              placeholder="Type your message here..."
            />
            <div class="flex items-center p-3 pt-0">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button size="icon" variant="ghost">
                      <Paperclip class="size-4" />
                      <span class="sr-only">Attach file</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    Attach File
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger as-child>
                    <Button size="icon" variant="ghost">
                      <Mic class="size-4" />
                      <span class="sr-only">Use Microphone</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    Use Microphone
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Button class="ml-auto gap-1.5" size="sm" type="submit">
                Send Message
                <CornerDownLeft class="size-3.5" />
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </div>
</template>