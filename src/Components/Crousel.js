import React from 'react'

export default function Carousel() {
    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ height: "550px" }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner" style={{ height: "100%" }}>
                    <div className="carousel-item active">
                        <img src="https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2021/09/beef-burger.jpg" className="d-block w-100" alt="Burger" style={{ height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://c.ndtvimg.com/2023-03/0m65kep_samosa_625x300_10_March_23.jpg" className="d-block w-100" alt="Momos" style={{ height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className="carousel-item">
                        <img src="https://img.taste.com.au/pUWqjn9Q/taste/2016/11/chargrilled-fish-with-green-chilli-coriander-and-coconut-relish-70446-1.jpeg" className="d-block w-100" alt="Fish" style={{ height: "100%", objectFit: "cover" }} />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <div class="carousel-caption d-none d-md-block">
                    <div class="container-fluid">
                        <form class="d-flex">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
