import { test, excpect } from "@playwright/test"


test("Auto suggestion dropdown", async ({ page }) => {

    await page.goto("https://ui.vision/demo/webtest/frames")

    // total frmaes. it will return all the frames in a page
    const framess = await page.frames().length
    console.log(framess)

    //approcah 1:name or using url, if name attribute is present we can use name
    const frame1 = await page.frame({ url: "https://ui.vision/demo/webtest/frames/frame_2.html" })
    await frame1.fill("//input[@name='mytext2']", "Mani")


    //approac 2 = using frame locator
    //1)we need to write the frme locator after that we need to write the locator that we need to intereact
    const frame = await page.frameLocator("//frame[@src='frame_1.html']")
    frame.locator("//input[@name='mytext1']").fill("Mani")
    await page.waitForTimeout(5000)


    // // if we have frame inside another frame we have method childframes
    // const child = frame1.childFrames() // it will return list
    // child[1].locator() // so we can interact like this


})
