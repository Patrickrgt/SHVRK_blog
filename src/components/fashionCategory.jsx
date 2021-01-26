import React, { Component } from "react";
import PublishedAt from "../components/bodyPost.js";
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
      tabs: ["fashion", "art", "music", "social", "gaming"],

      allData: [],

      currentCategory: "",
      currentRef: "",
      currentData: [],

      currentPage: 1,
      pageSize: 1,

      sanityImgRef: "https://cdn.sanity.io/images/k41w8wre/production/",
      imgUrl: "",
      viewingImg: false,

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
      if (this.state.currentPage === this.state.currentData.length) {
        return;
      }

      await this.setState({
        currentPage: this.state.currentPage + 1,
        imgUrl: "",
      });
    } else if (e.deltaY < 0) {
      if (this.state.currentPage === 1) {
        return;
      }
      await this.setState({
        currentPage: this.state.currentPage - 1,
        imgUrl: "",
      });
    }
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
      rawRef: assetRef,
      viewingImg: true,
      imgUrl: imgUrl,
    });
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

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

  callCategory = async (category) => {
    let currentData = [];

    console.log(category);
    this.setState({
      currentCategory: category,
    });

    const tabs = {
      fashion: "a3f787be-6b97-4587-9ef6-5302d6778c31",
      art: "8e26201a-b6c9-40a9-9d0a-23cb9f1ec4e3",
      music: "88d64fa7-bf21-4c56-97a9-58fb16a3fd1c",
      social: "a4e75555-13fc-4f4c-8f72-590f39cb0f6f",
      gaming: "582dd494-89b2-43c3-b6d0-8542143900fa",
    };

    await this.setState(
      {
        currentCategory: tabs[category],
        imgUrl: "",
      },
      () => {
        console.log(this.state.currentCategory);
      }
    );

    for (const i in this.state.allData) {
      if (this.state.allData[i].categories[0]._ref === tabs[category]) {
        await currentData.push(this.state.allData[i]);
        console.log(currentData);
        this.setState(
          {
            currentData: currentData,
            loaded: true,
          },
          () => {
            console.log(this.state.currentData);
          }
        );
      }
    }
  };

  render() {
    const { length: currentCount } = this.state.currentData;
    const { pageSize, currentPage, currentData: currentPosts } = this.state;
    const currentPost = paginate(currentPosts, currentPage, pageSize);

    return (
      <div className="body-color">
        <figure id="blog-title-contain">
          <h1 id="blog-title" className="animate__animated animate__bounce">
            shvrk bloG
          </h1>
        </figure>

        <nav id="blog-tab-div">
          {this.state.tabs.map((tab, index) => (
            <button
              key={index}
              className="blog-tab"
              onClick={() => this.callCategory(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div>
          {currentPost.map((post, index) => (
            <div key={index}>
              <PublishedAt rawDate={post.publishedAt}></PublishedAt>
              {/* <h3 className="post-date">{this.formatDate(post.publishedAt)}</h3> */}
              <main className="post-div">
                <h3 className="post-title">{post.title}</h3>
                <span className="post-line"></span>
                <article id="post-div">
                  <BlockContent id="block" blocks={post.body} />
                </article>
              </main>
              {post.mainImage != undefined ? (
                <div>
                  <section>
                    <img
                      id="post-pointer"
                      className="post-pointer"
                      src={pointer}
                      onClick={() => this.displayImg(post)}
                    />
                  </section>
                  <img className="img-pure" src={this.state.imgUrl} />
                </div>
              ) : (
                <div></div>
              )}
              <Pagination
                itemsCount={currentCount}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={this.handlePageChange}
              ></Pagination>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default FashionCategoryJSX;
