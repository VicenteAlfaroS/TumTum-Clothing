
INSERT INTO productos 
(id_producto, categoria_producto, descripcion_producto, estado_producto, fecha_creacion, img_url_producto, nombre_producto, precio_producto, stock_producto) 
VALUES
(1, 'camiseta', 'Camiseta deportiva azul marino de estilo fútbol, ideal para uso casual o entrenamiento.', 'activo', '2025-10-30', '/img/image.png', 'Elixir Camiseta de Fútbol 10 Navy Blue', 35990, 20),
(2, 'camiseta', 'Camiseta sin mangas tipo tank top inspirada en el baloncesto, ligera y cómoda.', 'activo', '2025-10-30', '/img/2.png', 'Elixir Basket Tank Top', 28000, 20),
(3, 'camiseta', 'Camiseta blanca con diseño inspirado en la NFL, tejido suave y resistente.', 'activo', '2025-10-30', '/img/16.png', 'Elixir NFL Spider White', 33800, 20),
(4, 'camiseta', 'Camisa gris de estilo urbano, perfecta para el día a día.', 'activo', '2025-10-30', '/img/7.png', 'Elixir Camisa Gris', 23500, 20),
(5, 'chaqueta', 'Chaqueta de mezclilla cruda con acabado clásico y detalles modernos.', 'activo', '2025-10-30', '/img/4.png', 'Elixir Raw Denim Set Jacket', 29990, 20),
(6, 'chaqueta', 'Chaqueta de mezclilla gris para invierno, con forro cálido y diseño resistente.', 'activo', '2025-10-30', '/img/8.png', 'Elixir Gray Winter Denim Set Jacket', 35990, 20),
(7, 'chaqueta', 'Chaqueta de cuero negro con forro desmontable de piel sintética.', 'activo', '2025-10-30', '/img/6.png', 'Elixir Black Leather Fur Detachable Jacket', 55900, 20),
(8, 'pantalones', 'Jeans ajustados con diseño desmontable y acabado moderno.', 'activo', '2025-10-30', '/img/9.png', 'Elixir X Cozy DETACHABLE jeans', 89990, 20),
(9, 'pantalones', 'Jeans negros desmontables con estilo urbano y corte moderno.', 'activo', '2025-10-30', '/img/10.png', 'Elixir Detachable Black Jeans', 78880, 20),
(10, 'pantalones', 'Pantalones deportivos con incrustaciones de brillantes y diseño llamativo.', 'activo', '2025-10-30', '/img/15.png', 'Elixir Rhinestones Tracksuit Pants', 78990, 20),
(11, 'short', 'Short blanco de mezclilla, ideal para un look veraniego y fresco.', 'activo', '2025-10-30', '/img/3.png', 'Elixir White Denim Set Short', 29990, 20),
(12, 'short', 'Short blanco con detalles tribales y corte relajado.', 'activo', '2025-10-30', '/img/13.png', 'Elixir White Tribal Short', 35990, 20),
(13, 'short', 'Short negro de mezclilla con diseño versátil y moderno.', 'activo', '2025-10-30', '/img/12.png', 'Elixir Black Denim Set Short', 33990, 20),
(14, 'gorro', 'Gorro reversible cómodo y cálido, ideal para días fríos.', 'activo', '2025-10-30', '/img/1.png', 'Elixir Reversible Beanie', 9990, 20),
(15, 'gorro', 'Gorro reversible con diseño de telaraña, estilo único y casual.', 'activo', '2025-10-30', '/img/14.png', 'Elixir Reversible Spider-Web Beanie', 10990, 20);

INSERT INTO USUARIOS (id_usuario, apellidos_usuario, comuna_usuario, contrasenia_usuario,correo_usuario, direccion_usuario, estado_usuario,fecha_creacion,nacimiento_usuario,nombre_usuario,region_usuario,rol_usuario,rut_usuario)
VALUES (1,'Perez','Maipu','juan123','juan@duoc.cl','callegenerica #123', 'activo','2025-10-30','2006-02-1990','Juan','Region Metropolitana','ADMIN',203748204)
