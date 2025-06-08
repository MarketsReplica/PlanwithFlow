export const initialMessage = [
  // {
  //   message:
  //     ` **** Welcome to Plan with Flow. ****
  //      [Quick Tutorial](https://millionmore.notion.site/A-3-Min-Tutorial-72720432207d4a019adec0a786def155?pvs=4)
  //      [Flow Help Center](https://millionmore.notion.site/Flow-Help-Center-d08ac48f336e474fb2bcaded20e92b3c?pvs=4)`,
  //   sender: "Canvas",
  //   dataPlot: undefined,
  // },

  {
    message:
      `**** To start, write a description of your income, expenses, assets and debts in natural text.****`,
    sender: "Canvas",
    dataPlot: undefined,
  },

];


/*
<div className="font-medium text-xl">Welcome to Plan with Flow</div>
          <ul className="p-0">
            <li className="font-normal text-base">
              <a
                href="https://www.notion.so/millionmore/A-3-Min-Tutorial-72720432207d4a019adec0a786def155?pvs=4"
                target="_blank"
                rel="noreferrer"
              >
                Quick Tutorial
              </a>
            </li>
            <li className="font-normal text-base">
              <a
                rel="noreferrer"
                href="https://www.notion.so/millionmore/Flow-Help-Center-d08ac48f336e474fb2bcaded20e92b3c?pvs=4"
                target="_blank"
              >
                Flow Help Center
              </a>
            </li>

            <li className="font-normal text-base">
              Join our help community to ask questions and propose new features.{" "}
            </li>

            <li className="font-normal text-base">
              <a
                href="https://www.reddit.com/r/PlanwithFlow/"
                target="_blank"
                rel="noreferrer"
                className="mx-2"
              >
                {" "}
                <img src={redditIcon} alt="reddit-icon" style={{ width: "23px", marginTop: "0px" }} />
              </a>{" "}
              <a href="https://discord.gg/hPhGWPeM6r" target="_blank" rel="noreferrer">
                {" "}
                <img src={discordIcon} alt="discord-icon" style={{ width: "23px" }} />{" "}
              </a>
            </li>
          </ul>
          <div className="font-normal text-base mb-2">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/nkWQFDfGNVQ?rel=0"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <div className="font-medium text-xl mt-7 ">Plan with Flow GPT:</div>
          <div className="font-normal text-base mb-2">
            Describe your income, expenses, assets and liabilities in plain language:
          </div>
          <ChatInputContainer>
            <Input.TextArea
              style={styles.chatInput}
              autoSize={{ minRows: 2, maxRows: 4 }}
              value={message}
              placeholder={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                // pressing enter but not holding the shift key
                if (e.key === "Enter" && e.shiftKey === false) {
                  updateCanvas();
                }
              }}
            />
            {loading && <Spin> </Spin>}
            <SendOutlined style={styles.sendMessageIcon} onClick={updateCanvas} />
          </ChatInputContainer>
*/
