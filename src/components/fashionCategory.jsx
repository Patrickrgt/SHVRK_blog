import React, { Component } from "react";
import Pagination from "../components/pagination";
import { paginate } from "../utils/paginate";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import pointer from "../img/pointer.png";
import pointerback from "../img/pointerback.png";

class FashionCategoryJSX extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 1,

      sanityImgRef: "https://cdn.sanity.io/images/k41w8wre/production/",
      imgUrl: "",
      viewingImg: false,
      allData: [],

      fashion: false,
      fashionRef: "a3f787be-6b97-4587-9ef6-5302d6778c31",
      fashionPosts: [],

      art: false,
      artRef: "8e26201a-b6c9-40a9-9d0a-23cb9f1ec4e3",
      artPosts: [],

      music: false,
      musicRef: "88d64fa7-bf21-4c56-97a9-58fb16a3fd1c",
      musicPosts: [],

      social: false,
      socialRef: "a4e75555-13fc-4f4c-8f72-590f39cb0f6f",
      socialPosts: [],

      gaming: false,
      gamingRef: "582dd494-89b2-43c3-b6d0-8542143900fa",
      gamingPosts: [],

      prev: window.scrollY,
    };
  }

  async componentDidMount() {
    await sanityClient
      .fetch(`*[_type == "post"]`)
      .then((data) =>
        this.setState(
          {
            allData: data,
          },
          () => console.log(this.state.allData)
        )
      )
      .catch(console.error);

    console.log("test");
    window.addEventListener("wheel", (e) => this.handleNavigation(e));
  }

  handleNavigation = async (e) => {
    if (e.deltaY > 0) {
      if (this.state.currentPage === this.state.fashionLength) {
        return;
      }

      await this.setState(
        {
          currentPage: this.state.currentPage + 1,
        },
        () => {}
      );
    } else if (e.deltaY < 0) {
      if (this.state.currentPage === 1) {
        return;
      }
      await this.setState(
        {
          currentPage: this.state.currentPage - 1,
        },
        () => {}
      );
    }

    if (this.state.viewingImg === true) {
      let bodyBlock = document.getElementById("post-div");
      bodyBlock.style.display = "block";

      let pointerBlock = document.getElementById("post-pointer");
      pointerBlock.style.display = "block";

      let imgBlock = document.getElementById("img-div");
      imgBlock.style.display = "none";

      this.setState({
        viewingImg: false,
      });
    } else return;
  };

  async displayImg(post) {
    let assetRef = post.mainImage.asset._ref;
    let imageRef = assetRef.split("-");
    let imgUrl =
      (await this.state.sanityImgRef) +
      imageRef[1] +
      "-" +
      imageRef[2] +
      "." +
      imageRef[3];
    await this.setState({
      viewingImg: true,
      imgUrl: imgUrl,
    });

    let bodyBlock = document.getElementById("post-div");
    bodyBlock.style.display = "none";

    let pointerBlock = document.getElementById("post-pointer");
    pointerBlock.style.display = "none";

    let imgBlock = document.getElementById("img-div");
    imgBlock.style.display = "block";
  }

  hideImg() {
    this.setState({
      viewingImg: false,
    });

    let bodyBlock = document.getElementById("post-div");
    bodyBlock.style.display = "block";

    let pointerBlock = document.getElementById("post-pointer");
    pointerBlock.style.display = "block";

    let imgBlock = document.getElementById("img-div");
    imgBlock.style.display = "none";
  }

  //
  // PAGINATION
  //

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  //
  //   CATEGORY SEPARATION
  //

  fashionCategory = async (tab) => {
    // Loops though all the data to filter for posts with the fashion category
    console.log(tab);
    tab.target.classList.add("blog-active");

    let fashionPosts = [];
    let allData = this.state.allData;
    let i = 0;
    for (i in allData) {
      if (allData[i].categories[0]._ref === this.state.fashionRef) {
        await fashionPosts.push(allData[i]);
      }
    }

    await this.setState({
      fashion: true,
      art: false,
      music: false,
      social: false,
      gaming: false,
      fashionPosts: fashionPosts,
      fashionLength: fashionPosts.length,
    });

    console.log(this.state.fashionPosts);
  };

  //
  //   CATEGORY SEPARATION
  //

  artCategory = async (tab) => {
    // Loops though all the data to filter for posts with the fashion category

    tab.target.classList.add("blog-active");

    let artPosts = [];
    let allData = this.state.allData;
    let i = 0;
    for (i in allData) {
      if (allData[i].categories[0]._ref === this.state.artRef) {
        await artPosts.push(allData[i]);
      }
    }

    await this.setState({
      fashion: false,
      art: true,
      music: false,
      social: false,
      gaming: false,
      artPosts: artPosts,
      artLength: artPosts.length,
    });

    console.log(this.state.artPosts);
  };

  //
  //   CATEGORY SEPARATION
  //

  musicCategory = async (tab) => {
    // Loops though all the data to filter for posts with the fashion category

    tab.target.classList.add("blog-active");

    let musicPosts = [];
    let allData = this.state.allData;
    let i = 0;
    for (i in allData) {
      if (allData[i].categories[0]._ref === this.state.musicRef) {
        await musicPosts.push(allData[i]);
      }
    }

    await this.setState({
      fashion: false,
      art: false,
      music: true,
      social: false,
      gaming: false,
      musicPosts: musicPosts,
      musicLength: musicPosts.length,
    });

    console.log(this.state.musicPosts);
  };

  //
  //   CATEGORY SEPARATION
  //

  socialCategory = async (tab) => {
    // Loops though all the data to filter for posts with the fashion category

    tab.target.classList.add("blog-active");

    let socialPosts = [];
    let allData = this.state.allData;
    let i = 0;
    for (i in allData) {
      if (allData[i].categories[0]._ref === this.state.socialRef) {
        await socialPosts.push(allData[i]);
      }
    }

    await this.setState({
      fashion: false,
      art: false,
      music: false,
      social: true,
      gaming: false,
      socialPosts: socialPosts,
      socialLength: socialPosts.length,
    });

    console.log(this.state.socialPosts);
  };

  //
  //   CATEGORY SEPARATION
  //

  gamingCategory = async (tab) => {
    // Loops though all the data to filter for posts with the fashion category
    let blogTab = document.querySelectorAll(".blog-tab");
    console.log(blogTab);

    tab.target.classList.add("blog-active");

    let gamingPosts = [];
    let allData = this.state.allData;
    let i = 0;
    for (i in allData) {
      if (allData[i].categories[0]._ref === this.state.gamingRef) {
        await gamingPosts.push(allData[i]);
      }
    }

    await this.setState({
      fashion: false,
      art: false,
      music: false,
      social: false,
      gaming: true,
      gamingPosts: gamingPosts,
      gamingLength: gamingPosts.length,
    });

    console.log(this.state.gamingPosts);
  };

  //
  //   CATEGORY SEPARATION
  //

  formatDate(isoDate) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    let longDate = new Date(isoDate);

    let day = longDate.getDate();
    let monthIndex = longDate.getMonth();
    let year = longDate.getFullYear();

    return months[monthIndex] + " " + day + " " + year;
  }

  //
  //   CATEGORY SEPARATION
  //

  render() {
    const { length: count } = this.state.fashionPosts;
    const { length: count2 } = this.state.artPosts;
    const { length: count3 } = this.state.musicPosts;
    const { length: count4 } = this.state.socialPosts;
    const { length: count5 } = this.state.gamingPosts;

    const {
      pageSize,
      currentPage,
      fashionPosts: fashionData,
      artPosts: artData,
      musicPosts: musicData,
      socialPosts: socialData,
      gamingPosts: gamingData,
    } = this.state;
    const fashionPost = paginate(fashionData, currentPage, pageSize);
    const artPost = paginate(artData, currentPage, pageSize);
    const musicPost = paginate(musicData, currentPage, pageSize);
    const socialPost = paginate(socialData, currentPage, pageSize);
    const gamingPost = paginate(gamingData, currentPage, pageSize);

    return (
      <React.Fragment className="body-color">
        <div id="blog-title-contain">
          <h1 id="blog-title" className="animate__animated animate__bounce">
            shvrk bloG
          </h1>
        </div>

        <div id="blog-tab-div">
          <button
            className="blog-tab"
            onClick={(tab) => this.fashionCategory(tab)}
          >
            fashion
          </button>
          <button className="blog-tab" onClick={(tab) => this.artCategory(tab)}>
            art
          </button>
          <button
            className="blog-tab"
            onClick={(tab) => this.musicCategory(tab)}
          >
            music
          </button>
          <button
            className="blog-tab"
            onClick={(tab) => this.socialCategory(tab)}
          >
            social
          </button>
          <button
            className="blog-tab"
            onClick={(tab) => this.gamingCategory(tab)}
          >
            gaming
          </button>
        </div>

        <div>
          {this.state.fashion === true ? (
            //   FASHION TERNARY
            <div>
              {this.state.viewingImg === true ? (
                <div id="img-div">
                  <img className="img-pure" src={this.state.imgUrl} alt="" />
                  <img
                    src={pointerback}
                    className="img-back"
                    onClick={() => this.hideImg()}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {fashionPost.map((post, index) => (
                <div>
                  <h3 className="post-date animate__animated animate__fadeInLeftBig">
                    {this.formatDate(post.publishedAt)}
                  </h3>
                  <div className="post-div">
                    <h3 className="post-title">{post.title}</h3>
                    <span className="post-line"></span>
                    <div id="post-div">
                      <BlockContent id="block" blocks={post.body} />
                    </div>
                  </div>
                  {post.mainImage != undefined ? (
                    <div>
                      <img
                        id="post-pointer"
                        className="post-pointer"
                        src={pointer}
                        onClick={() => this.displayImg(post)}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Pagination
                    itemsCount={count}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              ))}
            </div>
          ) : //
          //   TERNARY SEPARATION
          //

          this.state.art === true ? (
            //   FASHION TERNARY
            <div>
              {this.state.viewingImg === true ? (
                <div id="img-div">
                  <img className="img-pure" src={this.state.imgUrl} alt="" />
                  <img
                    src={pointerback}
                    className="img-back"
                    onClick={() => this.hideImg()}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {artPost.map((post, index) => (
                <div>
                  <h3 className="post-date animate__animated animate__fadeInLeftBig">
                    {this.formatDate(post.publishedAt)}
                  </h3>
                  <div className="post-div">
                    <h3 className="post-title">{post.title}</h3>
                    <span className="post-line"></span>
                    <div id="post-div">
                      <BlockContent id="block" blocks={post.body} />
                    </div>
                  </div>
                  {post.mainImage != undefined ? (
                    <div>
                      <img
                        id="post-pointer"
                        className="post-pointer"
                        src={pointer}
                        onClick={() => this.displayImg(post)}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Pagination
                    itemsCount={count2}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              ))}
            </div>
          ) : //
          //   TERNARY SEPARATION
          //

          this.state.music === true ? (
            //   FASHION TERNARY
            <div>
              {this.state.viewingImg === true ? (
                <div id="img-div">
                  <img className="img-pure" src={this.state.imgUrl} alt="" />
                  <img
                    src={pointerback}
                    className="img-back"
                    onClick={() => this.hideImg()}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {musicPost.map((post, index) => (
                <div>
                  <h3 className="post-date animate__animated animate__fadeInLeftBig">
                    {this.formatDate(post.publishedAt)}
                  </h3>
                  <div className="post-div">
                    <h3 className="post-title">{post.title}</h3>
                    <span className="post-line"></span>
                    <div id="post-div">
                      <BlockContent id="block" blocks={post.body} />
                    </div>
                  </div>
                  {post.mainImage != undefined ? (
                    <div>
                      <img
                        id="post-pointer"
                        className="post-pointer"
                        src={pointer}
                        onClick={() => this.displayImg(post)}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Pagination
                    itemsCount={count3}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              ))}
            </div>
          ) : //
          //   TERNARY SEPARATION
          //

          this.state.social === true ? (
            //   FASHION TERNARY
            <div>
              {this.state.viewingImg === true ? (
                <div id="img-div">
                  <img className="img-pure" src={this.state.imgUrl} alt="" />
                  <img
                    src={pointerback}
                    className="img-back"
                    onClick={() => this.hideImg()}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {socialPost.map((post, index) => (
                <div>
                  <h3 className="post-date animate__animated animate__fadeInLeftBig">
                    {this.formatDate(post.publishedAt)}
                  </h3>
                  <div className="post-div">
                    <h3 className="post-title">{post.title}</h3>
                    <span className="post-line"></span>
                    <div id="post-div">
                      <BlockContent id="block" blocks={post.body} />
                    </div>
                  </div>
                  {post.mainImage != undefined ? (
                    <div>
                      <img
                        id="post-pointer"
                        className="post-pointer"
                        src={pointer}
                        onClick={() => this.displayImg(post)}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Pagination
                    itemsCount={count4}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              ))}
            </div>
          ) : //
          //   TERNARY SEPARATION
          //

          this.state.gaming === true ? (
            //   FASHION TERNARY
            <div>
              {this.state.viewingImg === true ? (
                <div id="img-div">
                  <img className="img-pure" src={this.state.imgUrl} alt="" />
                  <img
                    src={pointerback}
                    className="img-back"
                    onClick={() => this.hideImg()}
                  />
                </div>
              ) : (
                <div></div>
              )}
              {gamingPost.map((post, index) => (
                <div>
                  <h3 className="post-date animate__animated animate__fadeInLeftBig">
                    {this.formatDate(post.publishedAt)}
                  </h3>
                  <div className="post-div">
                    <h3 className="post-title">{post.title}</h3>
                    <span className="post-line"></span>
                    <div id="post-div">
                      <BlockContent id="block" blocks={post.body} />
                    </div>
                  </div>
                  {post.mainImage != undefined ? (
                    <div>
                      <img
                        id="post-pointer"
                        className="post-pointer"
                        src={pointer}
                        onClick={() => this.displayImg(post)}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                  <Pagination
                    itemsCount={count5}
                    pageSize={pageSize}
                    currentPage={currentPage}
                    onPageChange={this.handlePageChange}
                  />
                </div>
              ))}
            </div>
          ) : (
            <h1>nothing</h1>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default FashionCategoryJSX;
